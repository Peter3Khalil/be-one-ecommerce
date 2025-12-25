declare module '*.css';
declare module 'subdivisions-of-egypt' {
  interface Subregion {
    id: string;
    name_ar: string;
    name_en: string;
    name_long: string;
  }

  interface Governorate {
    id: number;
    name_ar: string;
    name_en: string;
  }

  function getGovernorates(): Array<{
    id: number;
    name_ar: string;
    name_en: string;
  }>;
  function getGovernoratesWithSubregions(): Array<
    Governorate & {
      subregions: Array<Subregion>;
    }
  >;
  // eslint-disable-next-line no-unused-vars
  function getGovernorate(GovernorateId: number): Governorate & {
    subregions: Array<Subregion>;
  };
  // eslint-disable-next-line no-unused-vars
  function getSubregions(GovernorateId: number): Array<Subregion>;
}
