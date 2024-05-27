import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/brand/logo.svg";
import DesktopNav from "@/app/components/desktop-nav";
import useDimensions from "@/app/hooks/useDimensions";
import simplifySvgPath from "@/app/hooks/simplifySvgPath";

import css from "@/styles/component-css/footer.module.scss";

interface FooterProps {
  showNewsletter?: boolean;
}

interface SocialBarProps {
  size: number;
}

interface SvgWaveProps {
  parentAttr: {
    width: number;
    height: number;
  };
}

const Footer: React.FC<FooterProps> = ({ showNewsletter = true }) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const parentAttr = useDimensions(footerRef);

  return (
    <>
      <footer className={css.footer} ref={footerRef}>
        {parentAttr.height && <SvgWave parentAttr={{ ...parentAttr }} />}
        <div className={css.container}>
          <div className={css.footerSubTitle}>
            <div className={css.flex}>
              <Image src="./assets/brand/logo.svg" alt="Meher+Howji logo" width="36" height="36" priority={true} />
              <SocialBar size={16} />
            </div>
            <div>
              <p className={css.siteTech}>
                <span>Built with NextJS, Supabase & using CSS Grids & Flexbox. Learn </span>
                <Link href="/how-i-built-my-website">how.</Link>
              </p>
              <p className={css.copyright}>Meher Howji © {new Date().getFullYear()}</p>
              <p>
                <Link href="/terms-and-conditions" passHref>
                  Terms of Service
                </Link>
                <span> - </span>
                <Link href="/privacy-policy" passHref>
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          <div className={css.footerNav}>
            <DesktopNav onFooter={true} onMobileNavToggle={function (): void {}} />
          </div>
        </div>
      </footer>
    </>
  );
};

const SocialBar: React.FC<SocialBarProps> = ({ size }) => {
  return (
    <div className={css.socialbarContainer}>
      <Link href="https://instagram.com/meherranjan">
        <svg width="15px" height="15px" role="img" aria-label="instagram icon">
          <use href="/assets/sprite.svg#instagram" />
        </svg>
      </Link>

      <Link href="https://www.youtube.com/@meherhowji">
        <svg width="15px" height="15px" role="img" aria-label="youtube icon">
          <use href="/assets/sprite.svg#youtube" />
        </svg>
      </Link>

      <Link href="https://in.linkedin.com/in/meherranjan">
        <svg width="15px" height="15px" role="img" aria-label="linkedin icon">
          <use href="/assets/sprite.svg#linkedin" />
        </svg>
      </Link>

      <Link href="https://www.udemy.com/user/meher-howji/">
        <svg width="15px" height="15px" role="img" aria-label="youtube icon">
          <use href="/assets/sprite.svg#udemy" />
        </svg>
      </Link>
    </div>
  );
};

const SvgWave: React.FC<SvgWaveProps> = ({ parentAttr }) => {
  const [perlinLine, setPerlinLine] = useState<string>("");

  useEffect(() => {
    setPerlinLine(get1DPerlinNoise(parentAttr.height));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function rand(): number {
    const M = 4294967296;
    const A = 1664525;
    const C = 1;
    let Z = Math.floor(Math.random() * M);
    Z = (A * Z + C) % M;
    return Z / M - 0.5;
  }

  function interpolate(pa: number, pb: number, px: number): number {
    const ft = px * Math.PI;
    const f = (1 - Math.cos(ft)) * 0.5;
    return pa * (1 - f) + pb * f;
  }

  function get1DPerlinNoise(parentHeight: number): string {
    let x = 0;
    const w = window.innerWidth;
    const h = 100;
    let y = h / 2;
    const amp = 100; // amplitude
    const wl = 250; // wavelength
    const fq = 1 / wl; // frequency
    let a = rand();
    let b = rand();
    const xyz: [number, number][] = [];

    while (x < w) {
      if (x % wl === 0) {
        a = b;
        b = rand();
        y = h / 2 + a * amp;
      } else {
        y = h / 2 + interpolate(a, b, (x % wl) / wl) * amp;
      }
      xyz.push([x, y]);
      x += 1;
    }

    let path = simplifySvgPath(xyz, {
      tolerance: 2.5,
      precision: 1,
    });
    const reset = path.substring(path.indexOf("c")) + 1;
    path = "M0,100" + reset + `L${w},${parentHeight}L0,${parentHeight}L0,100Z`;
    return path;
  }

  return (
    <div
      className={css.waveWrapper}
      style={{
        width: `${parentAttr.width}px`,
        height: `${parentAttr.height}px`,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="wave">
            <path d={perlinLine} />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Footer;
