import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FormField } from '../../components/form-component/form-component';
import { PrayerWallComponent } from '../prayer-wall/prayer-wall.component';
import { ScriptureMarqueeComponent } from '../../components/scripture-marquee/scripture-marquee.component';
import { ScriptureSectionComponent } from '../../components/scripture-section/scripture-section.component';

register();

gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormField, PrayerWallComponent, ScriptureMarqueeComponent, ScriptureSectionComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Home implements AfterViewInit {
  @ViewChild(PrayerWallComponent) prayerWall?: PrayerWallComponent;

   ngAfterViewInit() {
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
