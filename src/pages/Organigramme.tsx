import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, Award, Building2, Heart, BookOpen, Shield, Crown, UserCog } from 'lucide-react';
import { OrganigramService, type OrganigramMember } from '@/lib/organigram';
import { OrganigrammeCard } from '@/components/OrganigrammeCard';
import { FadeInView } from '@/components/FadeInView';
import { useAuth } from '@/hooks/useAuth';
import { Tree } from '@minoru/react-dnd-treeview';
import { Footer } from '@/components/Footer';
import { convertToPublicUrl } from '@/lib/utils';
import { Helmet } from 'react-helmet';
import { SiteHeader } from '@/components/SiteHeader';

export default function Organigramme() {
  const [orgData, setOrgData] = useState<OrganigramMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { user, userRole, signOut } = useAuth();
  const canEdit = userRole === 'admin' || userRole === 'doctor';
  const pageHelmet = (
    <Helmet>
      <title>Organisation | UFSBD Herault</title>
      <meta
        name="description"
        content="Decouvrez l'organisation et les membres de l'UFSBD Herault ainsi que les principales responsabilites au sein de l'association."
      />
      <link rel="canonical" href="https://ufsbd34.fr/organigramme" />
      <meta property="og:title" content="Organisation | UFSBD Herault" />
      <meta property="og:description" content="Decouvrez l'organisation et les membres de l'UFSBD Herault ainsi que les principales responsabilites au sein de l'association." />
      <meta property="og:url" content="https://ufsbd34.fr/organigramme" />
      <meta name="twitter:title" content="Organisation | UFSBD Herault" />
      <meta name="twitter:description" content="Decouvrez l'organisation et les membres de l'UFSBD Herault ainsi que les principales responsabilites au sein de l'association." />
    </Helmet>
  );

  useEffect(() => {
    fetchOrgData();
  }, []);

  const fetchOrgData = async () => {
    try {
      const members = await OrganigramService.getMembers();
      setOrgData(members);
    } catch (error) {
      console.error('Error fetching org data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (role: string) => {
    const iconMap = {
      president: Crown,
      vicePresidents: UserCheck,
      secretaire: BookOpen,
      secretaireAdjoint: BookOpen,
      tresorier: Shield,
      tresorierAdjoint: Shield,
      chargesMission: UserCog,
      verificateur: Award
    };
    return iconMap[role as keyof typeof iconMap] || Users;
  };

  const getRoleLabel = (role: string) => {
    return OrganigramService.getRoleLabel(role as any);
  };

  const getRoleColor = (role: string) => {
    const colorMap = {
      president: 'bg-gradient-to-br from-green-600 to-green-700',
      vicePresidents: 'bg-gradient-to-br from-blue-600 to-blue-700',
      secretaire: 'bg-gradient-to-br from-purple-600 to-purple-700',
      secretaireAdjoint: 'bg-gradient-to-br from-green-500 to-green-600',
      tresorier: 'bg-gradient-to-br from-blue-500 to-blue-600',
      tresorierAdjoint: 'bg-gradient-to-br from-purple-500 to-purple-600',
      chargesMission: 'bg-gradient-to-br from-green-700 to-green-800',
      verificateur: 'bg-gradient-to-br from-blue-700 to-blue-800'
    };
    return colorMap[role as keyof typeof colorMap] || 'bg-gradient-to-br from-purple-500 to-purple-600';
  };

  const MemberCard = ({ member }: { member: OrganigramMember }) => {
    const IconComponent = getIcon(member.role);
    const roleColor = getRoleColor(member.role);
    
    return (
      <Card className={`h-full transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 ${roleColor} text-white overflow-hidden`}>
        <CardHeader className="text-center pb-4 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-white/10"></div>
          
          {/* Image or Icon */}
          <div className="relative z-10 w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden border-2 border-white/30">
            {member.image?.url ? (
              <img 
                src={convertToPublicUrl(member.image.url)} 
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <IconComponent className={`h-10 w-10 text-white ${member.image?.url ? 'hidden' : ''}`} />
          </div>
          
          {/* Role Badge */}
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-2 shadow-lg">
            {getRoleLabel(member.role)}
          </Badge>
          
          {/* Title */}
          <CardTitle className="text-xl text-white drop-shadow-lg font-bold">
            {member.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center relative z-10">
          {/* Name */}
          <p className="text-white font-semibold text-lg mb-3 drop-shadow-lg">{member.name}</p>
          
          {/* Description */}
          {member.description && (
            <p className="text-white/95 text-sm leading-relaxed drop-shadow-md">
              {member.description}
            </p>
          )}
          
          {/* Members list for commissions */}
          {member.members && member.members.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <h4 className="text-white font-medium text-sm mb-2 drop-shadow-md">Membres:</h4>
              <ul className="space-y-1">
                {member.members.map((memberName: string, index: number) => (
                  <li key={index} className="text-white/90 text-xs drop-shadow-sm">• {memberName}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white flex items-center justify-center">
        {pageHelmet}
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement de l'organigramme...</p>
        </div>
      </div>
    );
  }

  // Group members by role for better organization
  const president = orgData.find(member => member.role === 'president');
  const bureauMembers = orgData.filter(member => 
    ['secretaire', 'secretaireAdjoint', 'tresorier', 'tresorierAdjoint'].includes(member.role)
  );
  const otherMembers = orgData.filter(member => 
    ['vicePresidents', 'chargesMission', 'verificateur'].includes(member.role)
  );

  const createMarqueeItems = (items: OrganigramMember[]) => {
    // Repeat items enough times to ensure smooth infinite scrolling even on large screens
    return [...items, ...items, ...items, ...items];
  };

  const treeData = orgData.map(member => ({
    id: member.id,
    parent: member.parent_id ?? 0,
    text: member.name,
    ...member
  }));

  const handleDrop = canEdit
    ? async (newTree, { dragSourceId, dropTargetId }) => {
        await OrganigramService.updateMember(dragSourceId, { parent_id: dropTargetId === 0 ? null : dropTargetId });
        fetchOrgData();
      }
    : undefined;

  return (
    <div className="public-site internal-page organization-page min-h-screen ambient-gradient">
      {pageHelmet}
      <SiteHeader />

      {/* Page Header */}
      <header className="internal-hero text-center relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] rounded-full bg-blue-100/40 blur-3xl mix-blend-multiply opacity-70"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[120%] rounded-full bg-cyan-100/40 blur-3xl mix-blend-multiply opacity-70"></div>
        </div>

        <div className="site-container relative z-10">
          <nav className="breadcrumb justify-center">
            <Link to="/">Accueil</Link>
            <span>/</span>
            <span>Organisation</span>
          </nav>
          
          <FadeInView>
            <h1 className="mx-auto text-white font-bold mb-5 drop-shadow-md">
              Organigramme <span className="text-cyan-300">UFSBD</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow">
              Section Hérault - Notre équipe dédiée à la santé bucco-dentaire
            </p>
          </FadeInView>
        </div>
      </header>          
      <div className="site-container py-20 md:py-28 overflow-hidden">
        {/* Président */}
        {president && (
          <div className="mb-28">
            <FadeInView>
              <div className="flex items-center justify-center gap-6 mb-12">
                <div className="h-[2px] w-12 bg-blue-200 rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight font-['Bricolage_Grotesque']">Présidence</h2>
                <div className="h-[2px] w-12 bg-blue-200 rounded-full"></div>
              </div>
            </FadeInView>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <FadeInView delay={150}>
                  <OrganigrammeCard member={president} onUpdated={fetchOrgData} editable={canEdit} />
                </FadeInView>
              </div>
            </div>
          </div>
        )}

        {/* Bureau Exécutif */}
        {bureauMembers.length > 0 && (
          <div className="mb-28">
            <FadeInView>
              <div className="flex items-center justify-center gap-6 mb-12">
                <div className="h-[2px] w-12 bg-cyan-200 rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight font-['Bricolage_Grotesque']">Bureau Exécutif</h2>
                <div className="h-[2px] w-12 bg-cyan-200 rounded-full"></div>
              </div>
            </FadeInView>
            <div className="relative overflow-visible w-full pause-on-hover py-4">
              {/* Fade edges */}
              <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none"></div>
              
              <div className="animate-tape-scroll gap-6">
                {createMarqueeItems(bureauMembers).map((member, index) => (
                  <div key={`${member.id}-${index}`} className="w-[280px] md:w-[320px] flex-shrink-0 h-full">
                    <OrganigrammeCard member={member} onUpdated={fetchOrgData} editable={canEdit} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Autres Membres */}
        {otherMembers.length > 0 && (
          <div className="mb-28">
            <FadeInView>
              <div className="flex items-center justify-center gap-6 mb-12">
                <div className="h-[2px] w-12 bg-purple-200 rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight font-['Bricolage_Grotesque']">Équipe de Direction</h2>
                <div className="h-[2px] w-12 bg-purple-200 rounded-full"></div>
              </div>
            </FadeInView>
            <div className="relative overflow-visible w-full pause-on-hover py-4">
              {/* Fade edges */}
              <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none"></div>
              
              <div className="animate-tape-scroll gap-6" style={{ animationDirection: 'reverse' }}>
                {createMarqueeItems(otherMembers).map((member, index) => (
                  <div key={`${member.id}-${index}`} className="w-[280px] md:w-[320px] flex-shrink-0 h-full">
                    <OrganigrammeCard member={member} onUpdated={fetchOrgData} editable={canEdit} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <FadeInView delay={200}>
          <div className="text-center mt-32">
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-500 border-0 max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay"></div>
              <CardContent className="p-12 md:p-16 relative z-10 text-white space-y-6">
                <h2 className="text-3xl font-bold font-['Bricolage_Grotesque'] mb-6 text-white drop-shadow-md">Besoin d'informations supplémentaires ?</h2>
                <p className="text-blue-50 text-lg max-w-xl mx-auto leading-relaxed mb-8">
                  Notre équipe se tient à votre disposition pour répondre à toutes vos questions concernant nos actions et notre organisation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/contact" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg">
                    Contactez-nous
                  </Link>
                  <a href="mailto:ufsbd34@ufsbd.fr" className="bg-blue-800/40 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800/60 backdrop-blur-sm transition-all duration-300 border border-white/20">
                    ufsbd34@ufsbd.fr
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeInView>
      </div>
      <Footer />
    </div>
  );
}
