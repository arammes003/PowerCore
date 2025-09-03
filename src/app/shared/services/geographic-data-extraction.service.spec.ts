import { TestBed } from '@angular/core/testing';
import { GeographicDataExtractionService } from './geographic-data-extraction.service';
import { GeographicData } from '../interfaces/geographic-data.interface';

describe('GeographicDataExtractionService', () => {
  let service: GeographicDataExtractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeographicDataExtractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('extractGeographicData', () => {
    it('should extract Las Palmas from descriptive text about islands', () => {
      const input = 'Mi residencia habitual es en las islas, concretamente en una que tiene Las y Palmas en el nombre, creo.';
      const result = service.extractGeographicData(input);
      
      expect(result.country).toBe('España');
      expect(result.autonomy).toBe('Canarias');
      expect(result.province).toBe('Las Palmas');
      expect(result.municipality).toBe('');
    });

    it('should return empty data for work-related locations without residence indicators', () => {
      const input = 'Soy técnico de sonido y trabajo en sitios como "Zaragoça", "Valensia" o incluso "Gerona" cuando hay eventos.';
      const result = service.extractGeographicData(input);
      
      expect(result.country).toBe('');
      expect(result.autonomy).toBe('');
      expect(result.province).toBe('');
      expect(result.municipality).toBe('');
    });

    it('should extract Logroño from capital of La Rioja reference', () => {
      const input = 'Desde hace años vivo en la capital de la Rioja, aunque nací en un pueblecito cerca de Navarra.';
      const result = service.extractGeographicData(input);
      
      expect(result.country).toBe('España');
      expect(result.autonomy).toBe('La Rioja');
      expect(result.province).toBe('La Rioja');
      expect(result.municipality).toBe('Logroño');
    });

    it('should extract Tarragona province for remote work location', () => {
      const input = 'Trabajo remoto desde un pueblo costero de Catalunya (creo que es Tarragona o cerca), pero viajo a Lleida a menudo.';
      const result = service.extractGeographicData(input);
      
      expect(result.country).toBe('España');
      expect(result.autonomy).toBe('Cataluña');
      expect(result.province).toBe('Tarragona');
      expect(result.municipality).toBe('Tarragona');
    });

    it('should return empty data for ambiguous zone references', () => {
      const input = 'Estudié psicología en Sevilla, luego me fui a trabajar a una ciudad con playa en Galicia que empieza por "V", pero ahora resido en la zona centro.';
      const result = service.extractGeographicData(input);
      
      expect(result.country).toBe('');
      expect(result.autonomy).toBe('');
      expect(result.province).toBe('');
      expect(result.municipality).toBe('');
    });

    it('should prioritize birth location when current residence is not specified', () => {
      const input = 'Nací en Valencia y ahora vivo en Madrid por trabajo.';
      const result = service.extractGeographicData(input);
      
      expect(result.country).toBe('España');
      expect(result.autonomy).toBe('Comunidad Valenciana');
      expect(result.province).toBe('Valencia');
      expect(result.municipality).toBe('Valencia');
    });

    it('should handle the specific input format mentioned in the problem', () => {
      const input = { texto: { texto: 'País: undefined (undefined) - Estado: null - Ciudad: Greater Barcelona Metropolitan Area' } };
      const result = service.extractGeographicData(input);
      
      expect(result.country).toBe('España');
      expect(result.autonomy).toBe('Cataluña');
      expect(result.province).toBe('Barcelona');
      expect(result.municipality).toBe('Barcelona');
    });

    it('should handle simple string input', () => {
      const input = 'Vivo en Madrid';
      const result = service.extractGeographicData(input);
      
      expect(result.country).toBe('España');
      expect(result.autonomy).toBe('Comunidad de Madrid');
      expect(result.province).toBe('Madrid');
      expect(result.municipality).toBe('Madrid');
    });

    it('should handle nested texto format', () => {
      const input = { texto: 'Resido en Barcelona' };
      const result = service.extractGeographicData(input);
      
      expect(result.country).toBe('España');
      expect(result.autonomy).toBe('Cataluña');
      expect(result.province).toBe('Barcelona');
      expect(result.municipality).toBe('Barcelona');
    });

    it('should return empty data for invalid input', () => {
      const result1 = service.extractGeographicData('');
      const result2 = service.extractGeographicData(null as any);
      const result3 = service.extractGeographicData(undefined as any);
      
      expect(result1.country).toBe('');
      expect(result2.country).toBe('');
      expect(result3.country).toBe('');
    });

    it('should handle misspellings correctly', () => {
      const input = 'Vivo en Valensia';
      const result = service.extractGeographicData(input);
      
      expect(result.country).toBe('España');
      expect(result.autonomy).toBe('Comunidad Valenciana');
      expect(result.province).toBe('Valencia');
      expect(result.municipality).toBe('Valencia');
    });

    it('should prioritize residence over birth when both are mentioned', () => {
      const input = 'Nací en Sevilla pero ahora vivo en Barcelona';
      const result = service.extractGeographicData(input);
      
      expect(result.country).toBe('España');
      expect(result.autonomy).toBe('Cataluña');
      expect(result.province).toBe('Barcelona');
      expect(result.municipality).toBe('Barcelona');
    });
  });
});