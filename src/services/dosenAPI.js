import axios from 'axios';

const PROJECT_ID = "mwkewvjpgcvlwgycdpvo";
const API_KEY = "sb_publishable_-mjKGRjVH18ef1G8ZCjTHg_dcP5lVxK";

const BASE_URL = `https://${PROJECT_ID}.supabase.co/rest/v1/dosen`;

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
};

export const dosenAPI = {
    async fetchDosen() {
        const response = await axios.get(BASE_URL, { headers });
        return response.data;
    },

    async fetchDosenByUserId(userId) {
        try {
            const urlFilter = `${BASE_URL}?user_id=eq.${userId}`;
            const response = await axios.get(urlFilter, { headers });
            return response.data[0] || null;
        } catch (error) {
            console.error(error.message);
            throw new Error("Gagal mengambil profil dosen.");
        }
    },

    async createDosen(dataInput) {
        try {
            const payloadDosen = {
                nidn: dataInput.nidn.trim(),
                nama: dataInput.nama.trim(),
                program_studi: dataInput.program_studi,
                email: dataInput.email.trim(),
                status: dataInput.status || "Aktif",
                user_id: dataInput.user_id
            };
            const response = await axios.post(BASE_URL, payloadDosen, { headers });
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw new Error("Gagal menyimpan data dosen.");
        }
    },

    async updateDosen(nidn, data) {
        const urlUpdate = `${BASE_URL}?nidn=eq.${nidn}`;
        const response = await axios.patch(urlUpdate, data, { headers });
        return response.data;
    },

    async deleteDosen(nidn) {
        const urlDelete = `${BASE_URL}?nidn=eq.${nidn}`;
        const response = await axios.delete(urlDelete, { headers });
        return response.data;
    },

    async fetchDashboardData(nidn) {
        try {
            const hariIni = new Date().toLocaleDateString("id-ID", { weekday: "long" });
            const jadwalUrl = BASE_URL.replace('dosen', 'jadwal');
            const absensiUrl = BASE_URL.replace('dosen', 'absensi');
            const nilaiUrl = BASE_URL.replace('dosen', 'nilai');

            const resJadwal = await axios.get(`${jadwalUrl}?nidn_dosen=eq.${nidn}`, { headers });
            const idJadwalList = resJadwal.data.map(j => j.id_jadwal);
            
            const resJadwalHariIni = resJadwal.data.filter(j => j.hari === hariIni);
            const resNilai = await axios.get(`${jadwalUrl}?nidn_dosen=eq.${nidn}&select=mata_kuliah,status_nilai`, { headers });
            
            let resAbsen = { data: [] };
            if (idJadwalList.length > 0) {
                resAbsen = await axios.get(`${absensiUrl}?id_jadwal=in.(${idJadwalList.join(',')})&select=id_mahasiswa,status_kehadiran,mahasiswa(nama,id_mahasiswa)`, { headers });
            }

            return {
                jadwal: resJadwalHariIni,
                nilai: resNilai.data,
                absen: resAbsen.data
            };
        } catch (error) {
            console.error(error);
            return { jadwal: [], nilai: [], absen: [] };
        }
    }
};