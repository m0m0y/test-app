import { create } from 'zustand';
import api from "@/services/api";

interface LocationProps {
    name: string;
    location_code: string;
}

interface LocationStore {
    islands: { label: string; value: string }[];
    regions: { label: string, value: string }[];
    province: { label: string, value: string }[];
    municipality: { label: string, value: string }[];
    barangay: { label: string, value: string }[];

    selectedIsland: string | undefined;
    selectedRegion: string | undefined;
    selectedProvince: string | undefined;
    selectedMunicipality: string | undefined;
    selectedBarangay: string | undefined;

    resetLocationData: () => void; // reseting location data

    fetchRegions: (island: string) => void;
    fetchProvince: (region: string) => void; 
    fetchMunicipality: (municipality: string) => void;
    fetchBarangay: (province: string) => void;

    setSelectedIsland: (name: string | undefined ) => void;
    setSelectedRegion: (location_code: string | undefined) => void;
    setSelectedProvince: (location_code: string | undefined) => void;
    setSelectedMunicipality: (location_code: string | undefined) => void;
    setSelectedBarangay: (location_code: string | undefined) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
    islands: [
        { label: 'Luzon', value: 'Luzon' },
        { label: 'Visayas', value: 'Visayas' },
        { label: 'Mindanao', value: 'Mindanao' },
    ],
    regions: [],
    province: [],
    municipality: [],
    barangay: [],

    selectedIsland: undefined,
    selectedRegion: undefined,
    selectedProvince: undefined,
    selectedMunicipality: undefined,
    selectedBarangay: undefined,

    resetLocationData: () => {
        set({ selectedIsland: undefined, selectedRegion: undefined, selectedProvince: undefined, selectedMunicipality: undefined, regions: [], province: [], municipality: [], });
    },

    fetchRegions: async(islandName: string) => {
        try {
            const result = await api.get(`/location/${islandName}`); // select location by location code
            // console.log('API response:', result.data);
            set({
                regions: result.data.location.map((r: LocationProps) => ({
                    label: r.name,
                    value: r.location_code,
                })),
            });
        } catch (error: any) {
            console.error('Error fetching regions:', error.response);
            set({ regions: [] });
        }
    },

    setSelectedIsland: (name) => {
        set({ 
            selectedIsland: name, 
            selectedRegion: undefined,
            selectedProvince: undefined,
            selectedMunicipality: undefined,
            selectedBarangay: undefined,
            regions: [],
            province: [],
            municipality: [],
            barangay: [],
        });

        console.log('use location state setSelectedIsland log: ' + name);

        if (name) {
            useLocationStore.getState().fetchRegions(name);
        }
    },

    fetchProvince: async(regionLocationCode) => {
        try {
            const result = await api.get(`/location/${regionLocationCode}`); 
            // console.log('API response:', result.data);
            set({
                province: result.data.location.map((r: LocationProps) => ({
                    label: r.name,
                    value: r.location_code
                })),
            });
        } catch(error: any) {
            console.error('Error fetching regions:', error.response);
            set({ province: [] });
        }
    },

    setSelectedRegion: (location_code) => {
        set({ 
            selectedRegion: location_code, 
            selectedProvince: undefined,
            selectedMunicipality: undefined,
            selectedBarangay: undefined,
            province: [],
            municipality: [],
            barangay: [],
        });
        console.log('use location state setSelectedRegion log: ' + location_code);
        if (location_code) {
            useLocationStore.getState().fetchProvince(location_code);
        }
    },

    fetchMunicipality: async(provinceLocationCode) => {
        try {
            const result = await api.get(`/location/${provinceLocationCode}`); 
            set({
                municipality: result.data.location.map((r: LocationProps) => ({
                    label: r.name,
                    value: r.location_code
                })),
            });
        } catch(error: any) {
            console.error('Error fetching regions:', error.response);
            set({ municipality: [] });
        }
    },

    setSelectedProvince: (location_code) => { 
        set({ 
            selectedProvince: location_code, 
            selectedMunicipality: undefined,
            selectedBarangay: undefined,
            municipality: [],
            barangay: [],
        });

        console.log('use location state setSelectedProvince log: ' + location_code);

        if (location_code) {
            useLocationStore.getState().fetchMunicipality(location_code);
        } 
    },

    fetchBarangay: async(municipalityLocationCode) => {
        try {
            const result = await api.get(`/location/${municipalityLocationCode}`); 
            // console.log('API response:', result.data);
            set({
                barangay: result.data.location.map((r: LocationProps) => ({
                    label: r.name,
                    value: r.location_code
                })),
            });
        } catch(error: any) {
            console.error('Error fetching regions:', error.response);
            set({ barangay: [] });
        }
    },

    setSelectedMunicipality: (location_code) => {
        set({
            selectedMunicipality: location_code,
            selectedBarangay: undefined,
            barangay: [],
        });

        console.log('use location state setSelectedMunicipality log: ' + location_code);

        if (location_code) {
            useLocationStore.getState().fetchBarangay(location_code)
        }
    },

    setSelectedBarangay: (location_code) => {
        set({ 
            selectedBarangay: location_code,
        });

        console.log('use location state setSelectedBarangay log: ' + location_code);
    },

}));