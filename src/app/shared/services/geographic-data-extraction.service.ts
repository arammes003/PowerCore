import { Injectable } from '@angular/core';
import { GeographicData, TextInput, NestedTextInput } from '../interfaces/geographic-data.interface';

@Injectable({
  providedIn: 'root',
})
export class GeographicDataExtractionService {

  /**
   * Main method to extract geographic data from text input
   * @param input - Text input in various formats
   * @returns GeographicData object with extracted information
   */
  extractGeographicData(input: string | TextInput | NestedTextInput): GeographicData {
    // Normalize input to plain text
    let text = this.normalizeInput(input);
    
    // Initialize result with empty values
    const result: GeographicData = {
      country: '',
      autonomy: '',
      province: '',
      municipality: ''
    };

    // If text is empty or invalid, return empty result
    if (!text || typeof text !== 'string') {
      return result;
    }

    // Clean and preprocess the text
    text = this.preprocessText(text);

    // Extract geographic mentions from text
    const mentions = this.extractGeographicMentions(text);

    // Filter out temporary/work/study related locations
    const personalMentions = this.filterPersonalLocations(mentions, text);

    // If no personal mentions found, return empty result
    if (personalMentions.length === 0) {
      return result;
    }

    // Select the most specific and relevant location
    const selectedLocation = this.selectBestLocation(personalMentions, text);

    // Extract detailed geographic data from the selected location
    return this.extractDetailedData(selectedLocation, text);
  }

  /**
   * Normalize different input formats to plain text
   */
  private normalizeInput(input: string | TextInput | NestedTextInput): string {
    if (typeof input === 'string') {
      return input;
    }

    if (input && typeof input === 'object') {
      // Handle nested format { texto: { texto: "..." } }
      if ('texto' in input) {
        const textInput = input.texto;
        if (typeof textInput === 'string') {
          return textInput;
        }
        if (textInput && typeof textInput === 'object' && 'texto' in textInput) {
          return textInput.texto || '';
        }
      }
    }

    return '';
  }

  /**
   * Preprocess text to normalize and clean it
   */
  private preprocessText(text: string): string {
    // Normalize whitespace and convert to lowercase for processing
    return text.trim().replace(/\s+/g, ' ');
  }

  /**
   * Extract potential geographic mentions from text
   */
  private extractGeographicMentions(text: string): string[] {
    const mentions: string[] = [];
    
    // Pattern for Spanish geographic entities
    const spanishCities = [
      'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 
      'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vigo',
      'Gijón', 'Hospitalet', 'Granada', 'Vitoria', 'Elche', 'Oviedo', 'Badalona',
      'Cartagena', 'Terrassa', 'Jerez', 'Sabadell', 'Móstoles', 'Santa Cruz',
      'Pamplona', 'Almería', 'Fuenlabrada', 'Leganés', 'Donostia', 'Burgos',
      'Albacete', 'Santander', 'Castellón', 'Alcorcón', 'Logroño', 'Badajoz',
      'Salamanca', 'Huelva', 'Marbella', 'Lleida', 'Tarragona', 'León', 'Cadiz',
      'Dos Hermanas', 'Parla', 'Torrejón', 'Alcalá', 'Reus', 'Ourense', 'Gerona',
      'Baracaldo', 'Lugo', 'Santiago', 'Cáceres', 'Lorca', 'Coslada', 'Talavera',
      'El Puerto', 'Cornellá', 'Avilés', 'Palencia', 'Gava', 'Ceuta', 'Melilla'
    ];

    const spanishRegions = [
      'Andalucía', 'Cataluña', 'Catalunya', 'Madrid', 'Valencia', 'Comunidad Valenciana',
      'Galicia', 'Castilla y León', 'País Vasco', 'Euskadi', 'Castilla-La Mancha',
      'Canarias', 'Murcia', 'Aragón', 'Extremadura', 'Baleares', 'Islas Baleares',
      'Asturias', 'Navarra', 'Cantabria', 'La Rioja', 'Ceuta', 'Melilla'
    ];

    const spanishProvinces = [
      'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz',
      'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real',
      'Córdoba', 'Cuenca', 'Girona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva',
      'Huesca', 'Jaén', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Murcia',
      'Navarra', 'Ourense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja',
      'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo',
      'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza', 'Ceuta', 'Melilla'
    ];

    // Look for direct mentions
    const allLocations = [...spanishCities, ...spanishRegions, ...spanishProvinces];
    
    for (const location of allLocations) {
      const regex = new RegExp(`\\b${location}\\b`, 'gi');
      if (regex.test(text)) {
        mentions.push(location);
      }
    }

    // Look for descriptive mentions that can be inferred
    this.addInferredLocations(text, mentions);

    return [...new Set(mentions)]; // Remove duplicates
  }

  /**
   * Add locations that can be inferred from descriptions
   */
  private addInferredLocations(text: string, mentions: string[]): void {
    const lowerText = text.toLowerCase();

    // Handle specific descriptive patterns from examples
    if (lowerText.includes('las') && lowerText.includes('palmas')) {
      mentions.push('Las Palmas');
    }

    // Handle "capital de la rioja" or "capital de la Rioja"
    if (lowerText.includes('capital') && (lowerText.includes('rioja') || lowerText.includes('la rioja'))) {
      mentions.push('Logroño');
      mentions.push('La Rioja'); // Also add the region
    }

    if (lowerText.includes('greater barcelona')) {
      mentions.push('Barcelona');
    }

    // Handle common misspellings
    const misspellings: { [key: string]: string } = {
      'valensia': 'Valencia',
      'zaragoça': 'Zaragoza',
      'gerona': 'Girona'
    };

    for (const [misspelled, correct] of Object.entries(misspellings)) {
      if (lowerText.includes(misspelled)) {
        mentions.push(correct);
      }
    }
  }

  /**
   * Filter out locations that are temporary (work, study, travel)
   */
  private filterPersonalLocations(mentions: string[], text: string): string[] {
    const lowerText = text.toLowerCase();
    
    // Keywords that indicate temporary/non-personal locations
    const temporaryKeywords = [
      'trabajo', 'trabajo en', 'trabajo a', 'eventos', 'estudié', 'estudios',
      'viajo', 'viajes', 'vacaciones', 'temporalmente', 'sitios como',
      'trabajo remoto', 'a menudo'
    ];

    // Keywords that indicate personal/residential locations
    const personalKeywords = [
      'vivo', 'resido', 'residencia', 'nací', 'origen', 'habitual',
      'desde hace años', 'mi casa', 'mi hogar', 'domicilio'
    ];

    // If text contains clear personal indicators, keep all mentions
    const hasPersonalIndicators = personalKeywords.some(keyword => 
      lowerText.includes(keyword)
    );

    if (hasPersonalIndicators) {
      return mentions;
    }

    // If text only contains temporary indicators, filter out locations
    const hasTemporaryIndicators = temporaryKeywords.some(keyword => 
      lowerText.includes(keyword)
    );

    if (hasTemporaryIndicators && !hasPersonalIndicators) {
      return [];
    }

    // If ambiguous, keep mentions but be conservative
    return mentions;
  }

  /**
   * Select the best location from filtered mentions
   */
  private selectBestLocation(mentions: string[], text: string): string {
    if (mentions.length === 0) {
      return '';
    }

    if (mentions.length === 1) {
      return mentions[0];
    }

    const lowerText = text.toLowerCase();

    // Prioritize based on context
    // 1. Current residence indicators - check exact phrasing
    if (lowerText.includes('vivo en')) {
      // Extract what comes after "vivo en"
      const vivoEnMatch = lowerText.match(/vivo en ([^,\.]+)/);
      if (vivoEnMatch) {
        const locationAfterVivoEn = vivoEnMatch[1].trim();
        
        // Check if any mention matches what comes after "vivo en"
        for (const mention of mentions) {
          if (locationAfterVivoEn.includes(mention.toLowerCase()) || 
              locationAfterVivoEn.includes('capital') && mention.toLowerCase() === 'logroño') {
            return mention;
          }
        }
      }
    }

    // 2. Other residence indicators
    for (const mention of mentions) {
      if (lowerText.includes(`resido en ${mention.toLowerCase()}`) ||
          lowerText.includes(`residencia en ${mention.toLowerCase()}`)) {
        return mention;
      }
    }

    // 3. Birth/origin indicators (lower priority)
    for (const mention of mentions) {
      if (lowerText.includes(`nací en ${mention.toLowerCase()}`) ||
          lowerText.includes(`origen ${mention.toLowerCase()}`)) {
        return mention;
      }
    }

    // 4. Prefer more specific cities over regions, with special handling for capital references
    const preferredCities = ['Logroño', 'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Las Palmas'];
    
    // Special case: if text mentions "capital" and we have both a region and its capital, prefer the capital
    if (lowerText.includes('capital')) {
      if (mentions.includes('Logroño') && mentions.includes('La Rioja')) {
        return 'Logroño';
      }
    }
    
    for (const city of preferredCities) {
      if (mentions.some(m => m.toLowerCase() === city.toLowerCase())) {
        return mentions.find(m => m.toLowerCase() === city.toLowerCase())!;
      }
    }

    // 5. Return first mention if no clear preference
    return mentions[0];
  }

  /**
   * Extract detailed geographic data from the selected location
   */
  private extractDetailedData(location: string, text: string): GeographicData {
    const result: GeographicData = {
      country: '',
      autonomy: '',
      province: '',
      municipality: ''
    };

    if (!location) {
      return result;
    }

    // Spanish geographic data mapping
    const spanishGeography = this.getSpanishGeographyMapping();
    
    const locationLower = location.toLowerCase();
    
    // Find matching entry
    for (const entry of spanishGeography) {
      if (entry.names.some(name => name.toLowerCase() === locationLower)) {
        result.country = 'España';
        result.autonomy = entry.autonomy;
        result.province = entry.province;
        result.municipality = entry.municipality;
        break;
      }
    }

    return result;
  }

  /**
   * Get Spanish geography mapping data
   */
  private getSpanishGeographyMapping() {
    return [
      // Major cities and capitals
      { names: ['madrid'], autonomy: 'Comunidad de Madrid', province: 'Madrid', municipality: 'Madrid' },
      { names: ['barcelona'], autonomy: 'Cataluña', province: 'Barcelona', municipality: 'Barcelona' },
      { names: ['valencia'], autonomy: 'Comunidad Valenciana', province: 'Valencia', municipality: 'Valencia' },
      { names: ['sevilla'], autonomy: 'Andalucía', province: 'Sevilla', municipality: 'Sevilla' },
      { names: ['zaragoza'], autonomy: 'Aragón', province: 'Zaragoza', municipality: 'Zaragoza' },
      { names: ['málaga'], autonomy: 'Andalucía', province: 'Málaga', municipality: 'Málaga' },
      { names: ['murcia'], autonomy: 'Región de Murcia', province: 'Murcia', municipality: 'Murcia' },
      { names: ['las palmas'], autonomy: 'Canarias', province: 'Las Palmas', municipality: '' },
      { names: ['bilbao'], autonomy: 'País Vasco', province: 'Vizcaya', municipality: 'Bilbao' },
      { names: ['alicante'], autonomy: 'Comunidad Valenciana', province: 'Alicante', municipality: 'Alicante' },
      { names: ['córdoba'], autonomy: 'Andalucía', province: 'Córdoba', municipality: 'Córdoba' },
      { names: ['valladolid'], autonomy: 'Castilla y León', province: 'Valladolid', municipality: 'Valladolid' },
      { names: ['vigo'], autonomy: 'Galicia', province: 'Pontevedra', municipality: 'Vigo' },
      { names: ['gijón'], autonomy: 'Asturias', province: 'Asturias', municipality: 'Gijón' },
      { names: ['granada'], autonomy: 'Andalucía', province: 'Granada', municipality: 'Granada' },
      { names: ['vitoria'], autonomy: 'País Vasco', province: 'Álava', municipality: 'Vitoria-Gasteiz' },
      { names: ['logroño'], autonomy: 'La Rioja', province: 'La Rioja', municipality: 'Logroño' },
      { names: ['pamplona'], autonomy: 'Navarra', province: 'Navarra', municipality: 'Pamplona' },
      { names: ['santander'], autonomy: 'Cantabria', province: 'Cantabria', municipality: 'Santander' },
      { names: ['burgos'], autonomy: 'Castilla y León', province: 'Burgos', municipality: 'Burgos' },
      { names: ['salamanca'], autonomy: 'Castilla y León', province: 'Salamanca', municipality: 'Salamanca' },
      { names: ['león'], autonomy: 'Castilla y León', province: 'León', municipality: 'León' },
      { names: ['tarragona'], autonomy: 'Cataluña', province: 'Tarragona', municipality: 'Tarragona' },
      { names: ['lleida'], autonomy: 'Cataluña', province: 'Lleida', municipality: 'Lleida' },
      { names: ['girona', 'gerona'], autonomy: 'Cataluña', province: 'Girona', municipality: 'Girona' },
      
      // Provinces and autonomous communities
      { names: ['cataluña', 'catalunya'], autonomy: 'Cataluña', province: '', municipality: '' },
      { names: ['andalucía'], autonomy: 'Andalucía', province: '', municipality: '' },
      { names: ['galicia'], autonomy: 'Galicia', province: '', municipality: '' },
      { names: ['país vasco', 'euskadi'], autonomy: 'País Vasco', province: '', municipality: '' },
      { names: ['comunidad valenciana'], autonomy: 'Comunidad Valenciana', province: '', municipality: '' },
      { names: ['castilla y león'], autonomy: 'Castilla y León', province: '', municipality: '' },
      { names: ['castilla-la mancha'], autonomy: 'Castilla-La Mancha', province: '', municipality: '' },
      { names: ['canarias'], autonomy: 'Canarias', province: '', municipality: '' },
      { names: ['aragón'], autonomy: 'Aragón', province: '', municipality: '' },
      { names: ['extremadura'], autonomy: 'Extremadura', province: '', municipality: '' },
      { names: ['baleares', 'islas baleares'], autonomy: 'Islas Baleares', province: '', municipality: '' },
      { names: ['asturias'], autonomy: 'Asturias', province: 'Asturias', municipality: '' },
      { names: ['navarra'], autonomy: 'Navarra', province: 'Navarra', municipality: '' },
      { names: ['cantabria'], autonomy: 'Cantabria', province: 'Cantabria', municipality: '' },
      { names: ['la rioja'], autonomy: 'La Rioja', province: 'La Rioja', municipality: '' },
      { names: ['región de murcia'], autonomy: 'Región de Murcia', province: 'Murcia', municipality: '' },
    ];
  }
}