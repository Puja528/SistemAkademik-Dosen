import axios from 'axios';

// Ganti <project-url> dan <no-api-key> dengan data asli proyek Supabase kamu
const BASE_URL = "https://mwkewvjpgcvlwgycdpvo.supabase.co/rest/v1/mahasiswa"; 
const API_KEY = "sb_publishable_-mjKGRjVH18ef1G8ZCjTHg_dcP5lVxK";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
};

export const mahasiswaAPI = {
    // 1. Ambil Semua Data
    async fetchMahasiswa() {
        const response = await axios.get(BASE_URL, { headers });
        return response.data;
    },

    // 2. Tambah Data Baru
    async createMahasiswa(data) {
        const response = await axios.post(BASE_URL, data, { headers });
        return response.data;
    },

    // 3. Update Data (Berdasarkan id_mahasiswa / NIM)
    async updateMahasiswa(id, data) {
        // Format query param di Supabase untuk filter: ?id_mahasiswa=eq.NIM
        const urlUpdate = `${BASE_URL}?id_mahasiswa=eq.${id}`;
        const response = await axios.patch(urlUpdate, data, { headers });
        return response.data;
    },

    // 4. Hapus Data
    async deleteMahasiswa(id) {
        const urlDelete = `${BASE_URL}?id_mahasiswa=eq.${id}`;
        const response = await axios.delete(urlDelete, { headers });
        return response.data;
    }
};