
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  MainNavbar,
  PageHero,
  AboutSection,
  BenefitsSection,
  ContactSection,
  NewsletterSection,
  InfoCard,
  BenefitCard,
  SiteFooter,
  SectionTitle,
  LogoCloud
} from '@/components/page-components';
import StandardLayout from '@/components/layout/StandardLayout';

const ComponentsShowcase = () => {
  const { toast } = useToast();

  const showToast = (componentName: string) => {
    toast({
      title: `Component Clicked: ${componentName}`,
      description: "This component can be reused in your pages",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold p-4 bg-gray-100">Component Library</h1>
      <p className="p-4 bg-gray-100 border-b border-gray-200">
        This page showcases all the components extracted from the Cham Wings website design.
        Click on any component to select it for use in your page builder.
      </p>
      
      <div className="p-4 space-y-8">
        <div className="border rounded-md p-4">
          <SectionTitle title="Navigation Components" />
          <div onClick={() => showToast("MainNavbar")} className="cursor-pointer">
            <MainNavbar />
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <SectionTitle title="Hero Components" />
          <div onClick={() => showToast("PageHero")} className="cursor-pointer">
            <PageHero title="About us" />
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <SectionTitle title="Section Components" />
          
          <div className="mb-8 cursor-pointer" onClick={() => showToast("AboutSection")}>
            <AboutSection />
          </div>
          
          <div className="mb-8 cursor-pointer" onClick={() => showToast("BenefitsSection")}>
            <BenefitsSection />
          </div>
          
          <div className="mb-8 cursor-pointer" onClick={() => showToast("ContactSection")}>
            <ContactSection />
          </div>
          
          <div className="cursor-pointer" onClick={() => showToast("NewsletterSection")}>
            <NewsletterSection />
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <SectionTitle title="Card Components" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="cursor-pointer" onClick={() => showToast("InfoCard")}>
              <InfoCard 
                title="Our History"
                description="Cham Wings Airlines has been made a milestone as the first private airline in Syria and has succeeded in building a remarkable experience."
                imageSrc="/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png"
              />
            </div>
            
            <div className="cursor-pointer" onClick={() => showToast("BenefitCard")}>
              <BenefitCard 
                title="Exclusive Benefits With The Loyalty Program"
                imageSrc="/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png"
              />
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <SectionTitle title="Common Components" />
          
          <div className="mb-8 cursor-pointer" onClick={() => showToast("SectionTitle")}>
            <SectionTitle 
              title="This is a section title" 
              subtitle="With an optional subtitle that provides more context"
              align="center"
            />
          </div>
          
          <div className="cursor-pointer" onClick={() => showToast("LogoCloud")}>
            <LogoCloud 
              title="Our Partners"
              logos={Array(6).fill({
                src: "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png",
                alt: "Partner Logo"
              })}
            />
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <SectionTitle title="Footer Components" />
          
          <div className="cursor-pointer" onClick={() => showToast("SiteFooter")}>
            <SiteFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsShowcase;
