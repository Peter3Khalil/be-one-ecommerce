import { Button } from '@ui/button';
import { BadgeCheck, BadgeDollarSign, LucideIcon, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

const Hero = () => {
  const t = useTranslations();
  return (
    <section className="bg-accent pt-14 md:h-[calc(100svh-64px)] md:min-h-auto md:pt-24 dark:bg-background">
      <div className="container flex h-full flex-col justify-between gap-8 lg:flex-row">
        <div className="space-y-4">
          <h1 className="flex flex-col text-4xl font-black uppercase *:text-nowrap md:text-5xl lg:text-6xl rtl:gap-3 lg:rtl:gap-5">
            <span>{t('HomePage.hero.findClothes')}</span>
            <span>{t('HomePage.hero.thatMatches')}</span>
            <span>{t('HomePage.hero.yourStyle')}</span>
          </h1>
          <p className="max-w-md text-base text-muted-foreground md:text-lg">
            {t('HomePage.hero.description')}
          </p>
          <Button size="lg" className="w-full sm:w-[200px]">
            {t('Global.shopNow')}
          </Button>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            <FeatureItem
              icon={BadgeDollarSign}
              title={t('HomePage.hero.cashOnDelivery.title')}
              description={t('HomePage.hero.cashOnDelivery.description')}
            />
            <FeatureItem
              icon={Truck}
              title={t('HomePage.hero.fastDelivery.title')}
              description={t('HomePage.hero.fastDelivery.description')}
            />
            <FeatureItem
              icon={BadgeCheck}
              title={t('HomePage.hero.highQuality.title')}
              description={t('HomePage.hero.highQuality.description')}
            />
          </ul>
        </div>
        <div className="relative flex h-full flex-col items-center">
          <img
            src="/hero-desktop.png"
            className="mt-auto hidden w-full md:block md:w-[350px]"
          />
          <img src="/hero-mobile.png" className="mt-auto w-full md:hidden" />
          <StarSvg
            style={{
              animationDuration: '15s',
            }}
            className="absolute end-0 size-24 animate-spin fill-primary lg:-end-10 lg:top-0 lg:size-32"
          />
          <StarSvg
            style={{
              animationDuration: '15s',
              animationDirection: 'reverse',
            }}
            className="absolute start-0 bottom-48 animate-spin fill-primary lg:-start-14"
          />
        </div>
      </div>
    </section>
  );
};

const StarSvg: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={56}
      height={56}
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M28 0c.95 15.053 12.947 27.05 28 28-15.053.95-27.05 12.947-28 28-.95-15.053-12.947-27.05-28-28 15.053-.95 27.05-12.947 28-28z" />
    </svg>
  );
};

const FeatureItem: FC<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = ({ icon: Icon, title, description }) => {
  return (
    <li className="flex flex-col items-center gap-2 rounded-md bg-background p-3 text-center md:flex-row md:items-stretch md:text-start dark:bg-muted/60">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
        <Icon />
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-primary">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </li>
  );
};

export default Hero;
