import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import type { OrganigramMember, OrganigramRole } from '@/lib/organigram';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { OrganigramService } from '@/lib/organigram';

interface OrganigrammeCardProps {
  member: OrganigramMember;
  onUpdated?: () => void;
  editable?: boolean;
}

export function OrganigrammeCard({ member, onUpdated, editable }: OrganigrammeCardProps) {
  const [open, setOpen] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [form, setForm] = useState({
    name: member.name || '',
    role: member.role as OrganigramRole,
    imageFile: null as File | null,
    imageUrl: member.image?.url || member.image_url || '',
  });
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setForm({ ...form, role: value as OrganigramRole });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, imageFile: file, imageUrl: file ? URL.createObjectURL(file) : (member.image?.url || member.image_url || '') });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let image_id = member.image_id;
      // If a new image is selected, upload it
      if (form.imageFile) {
        // Upload to Supabase storage (gallery bucket, path: `${member.id}/${file.name}`)
        const result = await OrganigramService.uploadImage(form.imageFile, member.id);
        if (!result) throw new Error('Failed to upload image');
        image_id = result.id;
        // Update member image_id
        await OrganigramService.updateMemberImage(member.id, image_id);
      }
      // Update member fields
      await OrganigramService.updateMember(member.id, {
        name: form.name,
        role: form.role,
        image_id,
      });
      setOpen(false);
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error('Error saving:', err);
      alert('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  // Get the current image URL (handle both old and new data structures)
  const currentImageUrl = member.image?.url || member.image_url || '';

  // Get role-based colors for the card
  const getRoleAccent = (role: string) => {
    const accentMap = {
      president: 'border-blue-500 text-blue-700 bg-blue-50',
      vicePresidents: 'border-cyan-500 text-cyan-700 bg-cyan-50',
      secretaire: 'border-purple-500 text-purple-700 bg-purple-50',
      secretaireAdjoint: 'border-purple-400 text-purple-600 bg-purple-50',
      tresorier: 'border-emerald-500 text-emerald-700 bg-emerald-50',
      tresorierAdjoint: 'border-emerald-400 text-emerald-600 bg-emerald-50',
      chargesMission: 'border-amber-500 text-amber-700 bg-amber-50',
      verificateur: 'border-slate-500 text-slate-700 bg-slate-50'
    };
    return accentMap[role as keyof typeof accentMap] || 'border-blue-500 text-blue-700 bg-blue-50';
  };

  const accentClasses = getRoleAccent(member.role);
  const [borderColor, textColor, bgColor] = accentClasses.split(' ');

  return (
    <Card className={`h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border-t-4 ${borderColor} bg-white group rounded-xl shadow-md border-x-0 border-b-0 relative overflow-visible`}>
      <CardHeader className="text-center pb-2 pt-8 relative">
        <div className="relative w-28 h-28 mx-auto mb-5">
          {/* Subtle glow effect on hover */}
          <div className={`absolute inset-0 rounded-full ${bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-125 blur-md`}></div>
          
          <div className={`relative z-10 w-full h-full bg-slate-50 rounded-full flex items-center justify-center overflow-hidden border-[3px] border-white shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:border-transparent`}>
            {currentImageUrl ? (
              <img
                src={currentImageUrl}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <Users className={`h-10 w-10 text-slate-300 ${currentImageUrl ? 'hidden' : ''}`} />
          </div>
        </div>
        
        <Badge variant="secondary" className={`${bgColor} ${textColor} border-none font-semibold mb-3 shadow-sm px-4 py-1 text-[11px] uppercase tracking-wider rounded-full inline-flex`}>
          {member.title}
        </Badge>
        
        <CardTitle className="text-xl text-slate-800 font-bold tracking-tight">
          {member.name}
        </CardTitle>
        {editable && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary" className="absolute top-2 right-2 z-20">Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Member</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
                <div>
                  <label className="block mb-1 text-sm">Image</label>
                  <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} />
                  {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-full mx-auto" />}
                </div>
                <div>
                  <label className="block mb-1 text-sm">Name</label>
                  <Input name="name" value={form.name} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Role</label>
                  <Select value={form.role} onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {OrganigramService.getAvailableRoles().map(role => (
                        <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent className="text-center relative z-10 pb-8 px-6">
        {member.description && (
          <div 
            className="relative cursor-pointer" 
            onMouseEnter={() => setShowDesc(true)} 
            onMouseLeave={() => setShowDesc(false)}
          >
            <p className={`text-slate-500 text-sm leading-relaxed mb-4 transition-all duration-300 ${showDesc && member.description.length > 150 ? 'opacity-0' : 'line-clamp-4'}`}>
              {member.description}
            </p>
            
            {member.description.length > 150 && (
              <div 
                className={`absolute inset-x-0 bottom-full mb-4 z-[100] transition-all duration-400 ease-out origin-bottom text-left ${
                  showDesc 
                    ? 'opacity-100 translate-y-0 pointer-events-auto scale-100 rotate-x-0' 
                    : 'opacity-0 translate-y-8 pointer-events-none scale-95 rotate-x-12'
                }`}
                style={{ perspective: '1000px' }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-b from-[rgba(23,183,209,0.3)] to-[rgba(11,79,134,0.1)] rounded-3xl blur-md"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_30px_60px_-15px_rgba(7,52,92,0.3)] border border-white/50 p-6">
                    <p className="text-slate-800 text-sm leading-relaxed font-medium">
                      {member.description}
                    </p>
                  </div>
                  {/* Arrow pointing down to the card */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-white/90 border-r border-b border-white/50"></div>
                </div>
              </div>
            )}
          </div>
        )}
        {member.members && member.members.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100">
            <h4 className="text-slate-400 font-medium text-[11px] uppercase tracking-wider mb-3">Membres de l'équipe</h4>
            <ul className="space-y-2">
              {member.members.map((memberName: string, index: number) => (
                <li key={index} className="text-slate-600 text-sm font-medium">{memberName}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}