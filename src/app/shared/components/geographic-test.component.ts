import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeographicDataExtractionService } from '../services/geographic-data-extraction.service';
import { GeographicData } from '../interfaces/geographic-data.interface';

@Component({
  selector: 'app-geographic-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Geographic Data Extraction Test</h1>
      
      <div class="mb-6">
        <label for="textInput" class="block text-sm font-medium mb-2">
          Enter text to extract geographic data:
        </label>
        <textarea
          id="textInput"
          [(ngModel)]="inputText"
          class="w-full p-3 border border-gray-300 rounded-md"
          rows="3"
          placeholder="Enter text with geographic information..."
        ></textarea>
        <button
          (click)="extractData()"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Extract Geographic Data
        </button>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Test Examples</h2>
        <div class="space-y-2">
          <button
            *ngFor="let example of examples"
            (click)="setExample(example.text)"
            class="block w-full text-left p-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            {{ example.description }}
          </button>
        </div>
      </div>

      <div class="bg-gray-50 p-4 rounded-md">
        <h2 class="text-xl font-semibold mb-3">Extraction Result</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <strong>Country:</strong> {{ result.country || '(empty)' }}
          </div>
          <div>
            <strong>Autonomy:</strong> {{ result.autonomy || '(empty)' }}
          </div>
          <div>
            <strong>Province:</strong> {{ result.province || '(empty)' }}
          </div>
          <div>
            <strong>Municipality:</strong> {{ result.municipality || '(empty)' }}
          </div>
        </div>
        
        <div class="mt-4">
          <h3 class="font-semibold mb-2">JSON Output:</h3>
          <pre class="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">{{ jsonResult }}</pre>
        </div>
      </div>
    </div>
  `
})
export class GeographicTestComponent {
  private geographicService = inject(GeographicDataExtractionService);
  
  inputText = '';
  result: GeographicData = {
    country: '',
    autonomy: '',
    province: '',
    municipality: ''
  };

  examples = [
    {
      description: 'Islands with Las and Palmas',
      text: 'Mi residencia habitual es en las islas, concretamente en una que tiene Las y Palmas en el nombre, creo.'
    },
    {
      description: 'Work locations (should return empty)',
      text: 'Soy técnico de sonido y trabajo en sitios como "Zaragoça", "Valensia" o incluso "Gerona" cuando hay eventos.'
    },
    {
      description: 'Capital of La Rioja',
      text: 'Desde hace años vivo en la capital de la Rioja, aunque nací en un pueblecito cerca de Navarra.'
    },
    {
      description: 'Remote work from Tarragona',
      text: 'Trabajo remoto desde un pueblo costero de Catalunya (creo que es Tarragona o cerca), pero viajo a Lleida a menudo.'
    },
    {
      description: 'Ambiguous zone reference (should return empty)',
      text: 'Estudié psicología en Sevilla, luego me fui a trabajar a una ciudad con playa en Galicia que empieza por "V", pero ahora resido en la zona centro.'
    },
    {
      description: 'Birth in Valencia, living in Madrid',
      text: 'Nací en Valencia y ahora vivo en Madrid por trabajo.'
    },
    {
      description: 'Problem case: Greater Barcelona',
      text: 'País: undefined (undefined) - Estado: null - Ciudad: Greater Barcelona Metropolitan Area'
    }
  ];

  get jsonResult(): string {
    return JSON.stringify(this.result, null, 2);
  }

  setExample(text: string): void {
    this.inputText = text;
    this.extractData();
  }

  extractData(): void {
    if (!this.inputText.trim()) {
      this.result = {
        country: '',
        autonomy: '',
        province: '',
        municipality: ''
      };
      return;
    }

    this.result = this.geographicService.extractGeographicData(this.inputText);
  }
}