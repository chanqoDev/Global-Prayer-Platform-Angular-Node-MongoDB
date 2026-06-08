import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
// import type { Swiper } from 'swiper/types';
import gsap from 'gsap'; 
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FormField } from '../../components/form-component/form-component';
import { PrayerWallComponent } from '../prayer-wall/prayer-wall.component';

register();

gsap.registerPlugin(ScrollTrigger); 


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormField, PrayerWallComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Home implements AfterViewInit {
  @ViewChild(PrayerWallComponent) prayerWall?: PrayerWallComponent;

   ngAfterViewInit() {
    const swiperEl = document.querySelector('.hero swiper-container') as any;
    if (swiperEl && !swiperEl.injectStyles?.length) {
      swiperEl.injectStyles = [
        `
          .swiper-button-prev,
          .swiper-button-next {
            width: 40px;
            height: 40px;
            border: 1px solid rgba(201, 168, 76, 0.3);
            border-radius: 50%;
            background: transparent;
            color: #c9a84c;
          }

          .swiper-button-prev::after,
          .swiper-button-next::after {
            color: #c9a84c;
            font-size: 14px;
          }

          .swiper-pagination-bullet {
            background: rgba(201, 168, 76, 0.3);
            opacity: 1;
          }

          .swiper-pagination-bullet-active {
            background: #c9a84c;
          }
        `,
      ];
    }

    const panels = gsap.utils.toArray<HTMLElement>('.panel');

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        pin: true,
        pinSpacing: false,
        snap: {
          snapTo: 1,
          duration: 0.4,
          ease: 'power2.out', 
        }

      });
    });
  }

  onProgress(event: any) {
  console.log(event.detail[1]);
  }

  onSlideChange() {
    console.log('slide changed');
  }

  onPrayerAdded() {
    this.prayerWall?.loadPrayers();
  }

}
