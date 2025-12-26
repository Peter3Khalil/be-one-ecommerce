'use client';
import { Facebook, Github, Instagram, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations();
  return (
    <footer className="bg-accent/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:justify-items-center-safe">
          <div className="space-y-4">
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Link lang="en" href="/" className="text-2xl font-bold">
              Be One.
            </Link>
            <p className="text-sm text-muted-foreground">
              {t('Global.footerDescription')}
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Github"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('Global.shop')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('Global.allProducts')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('Global.newArrivals')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('Global.summerCollection')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('Global.winterCollection')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('Global.topSelling')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t('Global.customerService')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('Global.contactUs')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('Global.shippingInfo')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('Global.returns')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
          <p>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            &copy; {currentYear} <span lang="en">Be One.</span>{' '}
            {t('Global.rightsReserved')}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#" className="transition-colors hover:text-foreground">
              {t('Global.privacyPolicy')}
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              {t('Global.termsAndConditions')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
