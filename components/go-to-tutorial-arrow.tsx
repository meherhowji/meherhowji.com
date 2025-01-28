import Image from 'next/image';
import Link from 'next/link';
import leftArrow from '@/public/assets/icons/left-arrow.svg';
import rightArrow from '@/public/assets/icons/right-arrow.svg';
// import '@/styles/component-css/goToTutorialArrow.module.scss';

type GoToTutorialArrowProps = {
  prevNext: [string, string];
  isNext: boolean;
};

export default function GoToTutorialArrow({ prevNext: [prev, next], isNext }: GoToTutorialArrowProps) {
  const href = isNext ? next : prev;
  const svgArrow = isNext ? rightArrow : leftArrow;

  const containerClasses = `column is-one-quarter tutorialLink ${isNext ? 'rightArrow' : 'leftArrow'}`;
  const arrowBoxClasses = `arrowBox ${!isNext ? 'arrowBoxLeft' : ''}`;
  const timelineArrowClasses = `timelineArrow ${!href ? 'disabled' : ''}`;

  return (
    <div className={containerClasses}>
      <div className={arrowBoxClasses}>
        <div className={timelineArrowClasses}>
          <Link href={href ? `/${href}` : '/#'} passHref>
            <Image
              src={svgArrow}
              width={100}
              height={100}
              alt={`Read ${isNext ? 'next' : 'previous'}`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
