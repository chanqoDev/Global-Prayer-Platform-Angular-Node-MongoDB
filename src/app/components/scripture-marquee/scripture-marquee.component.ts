import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-scripture-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scripture-marquee.component.html',
  styleUrl: './scripture-marquee.component.scss',
})
export class ScriptureMarqueeComponent {
  readonly items = [
    { hebrew: 'רְפוּאָה', english: 'REFUAH' },
    { hebrew: 'פְּרִיצַת דֶּרֶךְ', english: 'PERITZAT' },
    { hebrew: 'גְּאֻלָּה', english: 'GEULAH' },
    { hebrew: 'חִזּוּק', english: 'CHIZZUK' },
    { hebrew: 'שָׁלוֹם', english: 'SHALOM' },
    { hebrew: 'תְּשׁוּבָה', english: 'TESHUVAH' },
    { hebrew: 'יְשׁוּעָה', english: 'YESHUAH' },
    { hebrew: 'בְּרָכָה', english: 'BERACHAH' },
    { hebrew: 'אֱמוּנָה', english: 'EMUNAH' },
    { hebrew: 'תִּקְוָה', english: 'TIKVAH' },
  ];
}
