-- 1. Buat Tabel KARYAWAN (Supertype)
CREATE TABLE KARYAWAN (
    id_karyawan INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    tipe_karyawan VARCHAR(20) NOT NULL -- Isinya bisa 'DOKTER' atau 'PERAWAT'
);

-- 2. Buat Tabel PERAWAT (Subtype)
CREATE TABLE PERAWAT (
    id_karyawan INT PRIMARY KEY,
    shift_jaga VARCHAR(20),
    area_tugas VARCHAR(50),
    FOREIGN KEY (id_karyawan) REFERENCES KARYAWAN(id_karyawan) ON DELETE CASCADE
);

-- 3. Buat Tabel DOKTER (Subtype & Unary Relationship)
CREATE TABLE DOKTER (
    id_karyawan INT PRIMARY KEY,
    id_supervisor INT NULL, -- Bisa NULL kalau dia atasan tertinggi
    spesialisasi VARCHAR(50),
    no_izin VARCHAR(50),
    FOREIGN KEY (id_karyawan) REFERENCES KARYAWAN(id_karyawan) ON DELETE CASCADE,
    FOREIGN KEY (id_supervisor) REFERENCES DOKTER(id_karyawan) ON DELETE SET NULL
);

-- 4. Buat Tabel PASIEN
CREATE TABLE PASIEN (
    id_pasien INT PRIMARY KEY AUTO_INCREMENT,
    nama_pasien VARCHAR(100) NOT NULL,
    tgl_lahir DATE,
    umur INT, -- Catatan: Umur biasanya dihitung dari tgl_lahir di level aplikasi, tapi kita taruh sini sesuai ERD
    jalan VARCHAR(150),
    kota VARCHAR(50)
);

-- 5. Buat Tabel NO_TELP_PASIEN (Multivalued Attribute)
CREATE TABLE NO_TELP_PASIEN (
    id_pasien INT,
    no_telp VARCHAR(20),
    PRIMARY KEY (id_pasien, no_telp),
    FOREIGN KEY (id_pasien) REFERENCES PASIEN(id_pasien) ON DELETE CASCADE
);

-- 6. Buat Tabel KELUARGA_PASIEN (Weak Entity)
CREATE TABLE KELUARGA_PASIEN (
    id_keluarga INT AUTO_INCREMENT,
    id_pasien INT,
    nama_keluarga VARCHAR(100),
    status_hubungan VARCHAR(50),
    PRIMARY KEY (id_keluarga, id_pasien), -- Partial Key + FK dari entitas kuat
    FOREIGN KEY (id_pasien) REFERENCES PASIEN(id_pasien) ON DELETE CASCADE
);

-- 7. Buat Tabel RUANG_OPERASI
CREATE TABLE RUANG_OPERASI (
    id_ruangan INT PRIMARY KEY AUTO_INCREMENT,
    nama_ruangan VARCHAR(50),
    lantai VARCHAR(10)
);

-- 8. Buat Tabel TINDAKAN_OPERASI (Associative Entity / M:N)
CREATE TABLE TINDAKAN_OPERASI (
    id_tindakan INT PRIMARY KEY AUTO_INCREMENT,
    id_dokter INT,
    id_pasien INT,
    id_ruangan INT,
    jadwal_operasi DATETIME,
    jenis_operasi VARCHAR(100),
    FOREIGN KEY (id_dokter) REFERENCES DOKTER(id_karyawan) ON DELETE RESTRICT,
    FOREIGN KEY (id_pasien) REFERENCES PASIEN(id_pasien) ON DELETE RESTRICT,
    FOREIGN KEY (id_ruangan) REFERENCES RUANG_OPERASI(id_ruangan) ON DELETE RESTRICT
);