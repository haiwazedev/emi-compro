import { getCopyKey } from "./keys";
import type { Locale } from "./routing";

const phrases: Record<string, Record<Locale, string>> = {
  "About PLN EMI focus areas": {
    en: "About PLN EMI focus areas",
    id: "Fokus PLN EMI",
  },
  "About Us": { en: "About Us", id: "Tentang Kami" },
  All: { en: "All", id: "Semua" },
  "All Documents": { en: "All Documents", id: "Semua Dokumen" },
  "All News": { en: "All News", id: "Semua Berita" },
  "All Services": { en: "All Services", id: "Semua Layanan" },
  "Annual reports and disclosures highlighting our measurable commitment.": {
    en: "Annual reports and disclosures highlighting our measurable commitment.",
    id: "Laporan tahunan dan keterbukaan informasi yang menunjukkan komitmen kami secara terukur.",
  },
  "A company photo is not available at this time.": {
    en: "A company photo is not available at this time.",
    id: "Foto perusahaan belum tersedia saat ini.",
  },
  "Board member information is temporarily unavailable. Please try again later.":
    {
      en: "Board member information is temporarily unavailable. Please try again later.",
      id: "Informasi anggota dewan untuk sementara tidak tersedia. Silakan coba lagi nanti.",
    },
  "Browse articles": { en: "Browse articles", id: "Telusuri artikel" },
  "Browse documents": { en: "Browse documents", id: "Telusuri dokumen" },
  "By submitting, you agree to be contacted by EMI regarding your inquiry. Your data is handled in our privacy policy.":
    {
      en: "By submitting, you agree to be contacted by EMI regarding your inquiry. Your data is handled in our privacy policy.",
      id: "Dengan mengirim formulir ini, Anda setuju dihubungi EMI mengenai pertanyaan Anda. Data Anda dikelola sesuai kebijakan privasi kami.",
    },
  "Climate Action": { en: "Climate Action", id: "Aksi Iklim" },
  "Close navigation menu": {
    en: "Close navigation menu",
    id: "Tutup menu navigasi",
  },
  Company: { en: "Company", id: "Perusahaan" },
  "Company history is not available at this time.": {
    en: "Company history is not available at this time.",
    id: "Sejarah perusahaan belum tersedia saat ini.",
  },
  "Company history is temporarily unavailable. Please try again later.": {
    en: "Company history is temporarily unavailable. Please try again later.",
    id: "Informasi sejarah perusahaan untuk sementara tidak tersedia. Silakan coba lagi nanti.",
  },
  "Company history is unavailable.": {
    en: "Company history is unavailable.",
    id: "Informasi sejarah perusahaan tidak tersedia.",
  },
  "Company introduction content is not available at this time.": {
    en: "Company introduction content is not available at this time.",
    id: "Informasi pengenalan perusahaan belum tersedia saat ini.",
  },
  "Company introduction is temporarily unavailable. Please try again later.": {
    en: "The company introduction is temporarily unavailable. Please try again later.",
    id: "Pengenalan perusahaan untuk sementara tidak tersedia. Silakan coba lagi nanti.",
  },
  "Company introduction is unavailable.": {
    en: "Company introduction is unavailable.",
    id: "Informasi pengenalan perusahaan tidak tersedia.",
  },
  "Company profile information is not available at this time.": {
    en: "Company profile information is not available at this time.",
    id: "Informasi profil perusahaan belum tersedia saat ini.",
  },
  "Company profile information is temporarily unavailable. Please try again later.":
    {
      en: "Company profile information is temporarily unavailable. Please try again later.",
      id: "Informasi profil perusahaan untuk sementara tidak tersedia. Silakan coba lagi nanti.",
    },
  "Company profile is unavailable.": {
    en: "Company profile is unavailable.",
    id: "Profil perusahaan tidak tersedia.",
  },
  "Company photo is unavailable.": {
    en: "Company photo is unavailable.",
    id: "Foto perusahaan tidak tersedia.",
  },
  "Company statistics are not available at this time.": {
    en: "Company statistics are not available at this time.",
    id: "Statistik perusahaan belum tersedia saat ini.",
  },
  "Company statistics are temporarily unavailable. Please try again later.": {
    en: "Company statistics are temporarily unavailable. Please try again later.",
    id: "Statistik perusahaan untuk sementara tidak tersedia. Silakan coba lagi nanti.",
  },
  "Company statistics are unavailable.": {
    en: "Company statistics are unavailable.",
    id: "Statistik perusahaan tidak tersedia.",
  },
  "Company website": { en: "Company website", id: "Situs perusahaan" },
  Commitment: { en: "Commitment", id: "Komitmen" },
  Compliance: { en: "Compliance", id: "Kepatuhan" },
  "Commitment Documents | PLN EMI": {
    en: "Commitment Documents | PLN EMI",
    id: "Dokumen Komitmen | PLN EMI",
  },
  "Connect with our team of experts. We're here to help you navigate energy efficiency, compliance, and climate action.":
    {
      en: "Connect with our team of experts. We're here to help you navigate energy efficiency, compliance, and climate action.",
      id: "Hubungi tim ahli kami untuk mendapatkan dukungan terkait efisiensi energi, kepatuhan, dan aksi iklim.",
    },
  "Contact details": { en: "Contact details", id: "Informasi kontak" },
  "Contact Us": { en: "Contact Us", id: "Hubungi Kami" },
  "Contact Us | PLN EMI": {
    en: "Contact Us | PLN EMI",
    id: "Hubungi Kami | PLN EMI",
  },
  "Contact PLN EMI by WhatsApp": {
    en: "Contact PLN EMI by WhatsApp",
    id: "Hubungi PLN EMI melalui WhatsApp",
  },
  "Corporate Policies": {
    en: "Corporate Policies",
    id: "Kebijakan Perusahaan",
  },
  "Decarbonization Strategy": {
    en: "Decarbonization Strategy",
    id: "Strategi Dekarbonisasi",
  },
  Direction: { en: "Direction", id: "Arah Perusahaan" },
  "Document Library": { en: "Document Library", id: "Pustaka Dokumen" },
  Dokumen: { en: "Documents", id: "Dokumen" },
  "Dokumen komitmen sedang tidak tersedia.": {
    en: "Commitment documents are temporarily unavailable.",
    id: "Dokumen komitmen sedang tidak tersedia.",
  },
  "Dokumen yang dipublikasikan akan ditampilkan di sini.": {
    en: "Published documents will appear here.",
    id: "Dokumen yang dipublikasikan akan ditampilkan di sini.",
  },
  Email: { en: "Email", id: "Email" },
  "Email PLN EMI": {
    en: "Email PLN EMI",
    id: "Kirim email ke PLN EMI",
  },
  "Email Us": { en: "Email Us", id: "Kirim Email" },
  "Energy Conservation": { en: "Energy Conservation", id: "Konservasi Energi" },
  "Energy Efficiency": { en: "Energy Efficiency", id: "Efisiensi Energi" },
  "Environment Compliance": {
    en: "Environment Compliance",
    id: "Kepatuhan Lingkungan",
  },
  "Explore our service divisions and discover the expertise that can help your organization move forward.":
    {
      en: "Explore our service divisions and discover the expertise that can help your organization move forward.",
      id: "Jelajahi divisi layanan dan keahlian kami untuk mendukung kemajuan organisasi Anda.",
    },
  "Explore the expertise and services that can help your organization move forward.":
    {
      en: "Explore the expertise and services that can help your organization move forward.",
      id: "Jelajahi keahlian dan layanan yang dapat mendukung kemajuan organisasi Anda.",
    },
  "Explore Services": { en: "Explore Services", id: "Jelajahi Layanan" },
  FAQ: { en: "FAQ", id: "FAQ" },
  "Featured article": { en: "Featured article", id: "Artikel pilihan" },
  "Fill in the form and our team will reach back out to you within 1–2 working days.":
    {
      en: "Fill in the form and our team will reach back out to you within 1–2 working days.",
      id: "Isi formulir ini dan tim kami akan menghubungi Anda dalam 1–2 hari kerja.",
    },
  "Filter articles by category": {
    en: "Filter articles by category",
    id: "Filter artikel berdasarkan kategori",
  },
  "Filter commitment documents by category": {
    en: "Filter commitment documents by category",
    id: "Filter dokumen komitmen berdasarkan kategori",
  },
  "Footer navigation": { en: "Footer navigation", id: "Navigasi footer" },
  "Frequently Asked": { en: "Frequently Asked", id: "Pertanyaan yang" },
  "Frequently Asked Questions": {
    en: "Frequently Asked Questions",
    id: "Pertanyaan yang Sering Diajukan",
  },
  "GET IN TOUCH": { en: "GET IN TOUCH", id: "HUBUNGI KAMI" },
  Home: { en: "Home", id: "Beranda" },
  "Home / About Us": { en: "Home / About Us", id: "Beranda / Tentang Kami" },
  "Home / Commitment": { en: "Home / Commitment", id: "Beranda / Komitmen" },
  "Home / Contact Us": {
    en: "Home / Contact Us",
    id: "Beranda / Hubungi Kami",
  },
  "Home / Media & Information": {
    en: "Home / Media & Information",
    id: "Beranda / Media & Informasi",
  },
  "Home / Services": { en: "Home / Services", id: "Beranda / Layanan" },
  "Home highlights are not available at this time.": {
    en: "Home highlights are not available at this time.",
    id: "Sorotan beranda belum tersedia saat ini.",
  },
  "Home highlights are temporarily unavailable. Please try again later.": {
    en: "Home highlights are temporarily unavailable. Please try again later.",
    id: "Sorotan beranda untuk sementara tidak tersedia. Silakan coba lagi nanti.",
  },
  "Home highlights are unavailable.": {
    en: "Home highlights are unavailable.",
    id: "Sorotan beranda tidak tersedia.",
  },
  "Home page": { en: "Home page", id: "Halaman beranda" },
  "Home | PLN EMI": { en: "PLN EMI", id: "PLN EMI" },
  Hubungi: { en: "Contact", id: "Hubungi" },
  Kami: { en: "Us", id: "Kami" },
  "Kebijakan Privasi": { en: "Privacy Policy", id: "Kebijakan Privasi" },
  "Learn More": { en: "Learn More", id: "Pelajari Lebih Lanjut" },
  Management: { en: "Management", id: "Manajemen" },
  "Management board": { en: "Management board", id: "Jajaran manajemen" },
  "Management information is unavailable.": {
    en: "Management information is unavailable.",
    id: "Informasi manajemen tidak tersedia.",
  },
  "Media & Information": { en: "Media & Information", id: "Media & Informasi" },
  Mission: { en: "Mission", id: "Misi" },
  "Muat lebih banyak dokumen": {
    en: "Load more documents",
    id: "Muat lebih banyak dokumen",
  },
  "NEW · COMMITMENT": { en: "NEW · COMMITMENT", id: "BARU · KOMITMEN" },
  "NEW · MEDIA & INFORMATION": {
    en: "NEW · MEDIA & INFORMATION",
    id: "BARU · MEDIA & INFORMASI",
  },
  "No company introduction found.": {
    en: "No company introduction found.",
    id: "Informasi pengenalan perusahaan belum tersedia.",
  },
  "No company profile found.": {
    en: "No company profile found.",
    id: "Profil perusahaan belum tersedia.",
  },
  "No company photo found.": {
    en: "No company photo found.",
    id: "Foto perusahaan belum tersedia.",
  },
  "No company statistics found.": {
    en: "No company statistics found.",
    id: "Statistik perusahaan belum tersedia.",
  },
  "No FAQs are currently available": {
    en: "No FAQs are currently available",
    id: "Belum ada FAQ yang tersedia",
  },
  "No history found.": {
    en: "No history found.",
    id: "Informasi sejarah belum tersedia.",
  },
  "No management information found.": {
    en: "No management information found.",
    id: "Informasi manajemen belum tersedia.",
  },
  "No members found.": {
    en: "No members found.",
    id: "Anggota belum tersedia.",
  },
  "No mission found.": {
    en: "No mission found.",
    id: "Informasi misi belum tersedia.",
  },
  "No home highlights found.": {
    en: "No home highlights found.",
    id: "Belum ada sorotan di beranda.",
  },
  "No service divisions are available yet.": {
    en: "No service divisions are available yet.",
    id: "Belum ada divisi layanan yang tersedia.",
  },
  "No vision found.": {
    en: "No vision found.",
    id: "Informasi visi belum tersedia.",
  },
  "No vision or mission found.": {
    en: "No vision or mission found.",
    id: "Informasi visi dan misi belum tersedia.",
  },
  "No published articles in this category yet.": {
    en: "There are no published articles in this category yet.",
    id: "Belum ada artikel yang dipublikasikan dalam kategori ini.",
  },
  "No articles found.": {
    en: "No articles found.",
    id: "Artikel tidak ditemukan.",
  },
  "No commitment documents are available yet.": {
    en: "No commitment documents are available yet.",
    id: "Belum ada dokumen komitmen yang tersedia.",
  },
  "No company introduction content is available at this time.": {
    en: "Company introduction content is not available at this time.",
    id: "Informasi pengenalan perusahaan belum tersedia saat ini.",
  },
  Our: { en: "Our", id: "Komitmen" },
  "Our Commitment": { en: "Our Commitment", id: "Komitmen Kami" },
  "Our History": { en: "Our History", id: "Sejarah Kami" },
  "Our Latest": { en: "Our Latest", id: "Terbaru" },
  "Our Service": { en: "Our Service", id: "Layanan Kami" },
  "Our Service Divisions": {
    en: "Our Service Divisions",
    id: "Divisi Layanan Kami",
  },
  "Our Services": { en: "Our Services", id: "Layanan Kami" },
  "Open in Google Maps": {
    en: "Open in Google Maps",
    id: "Buka di Google Maps",
  },
  "Open navigation menu": {
    en: "Open navigation menu",
    id: "Buka menu navigasi",
  },
  "PARTNER PLN EMI": { en: "PLN EMI CLIENTS", id: "KLIEN PLN EMI" },
  "PLN EMI": { en: "PLN EMI", id: "PLN EMI" },
  "PLN EMI commitment documents": {
    en: "PLN EMI commitment documents",
    id: "Dokumen komitmen PLN EMI",
  },
  "PLN EMI commitment resources": {
    en: "PLN EMI commitment resources",
    id: "Materi komitmen PLN EMI",
  },
  "PLN EMI contact details": {
    en: "PLN EMI contact details",
    id: "Informasi kontak PLN EMI",
  },
  "PLN EMI head office location": {
    en: "PLN EMI head office location",
    id: "Lokasi kantor pusat PLN EMI",
  },
  "PLN EMI head office location on Google Maps": {
    en: "PLN EMI head office location on Google Maps",
    id: "Lokasi kantor pusat PLN EMI di Google Maps",
  },
  "PLN EMI home hero": { en: "PLN EMI home hero", id: "Sorotan utama PLN EMI" },
  "PLN EMI partners": { en: "PLN EMI partners", id: "Mitra PLN EMI" },
  "PLN EMI company profile": {
    en: "PLN EMI company profile",
    id: "Profil perusahaan PLN EMI",
  },
  "Powering Indonesia Sustainable Future": {
    en: "Powering Indonesia's Sustainable Future",
    id: "Mendorong Masa Depan Berkelanjutan Indonesia",
  },
  "Previous image": { en: "Previous image", id: "Gambar sebelumnya" },
  "Previous service tag": {
    en: "Previous service tag",
    id: "Layanan sebelumnya",
  },
  "Previous slide": { en: "Previous slide", id: "Slide sebelumnya" },
  "Primary navigation": { en: "Primary navigation", id: "Navigasi utama" },
  "Profil Perusahaan": { en: "Company Profile", id: "Profil Perusahaan" },
  "Published documents will appear here.": {
    en: "Published documents will appear here.",
    id: "Dokumen yang dipublikasikan akan ditampilkan di sini.",
  },
  "Published service divisions will appear here.": {
    en: "Published service divisions will appear here.",
    id: "Divisi layanan yang dipublikasikan akan ditampilkan di sini.",
  },
  Questions: { en: "Questions", id: "Sering Diajukan" },
  "Read article": { en: "Read article", id: "Baca artikel" },
  "Read time": { en: "{count} min read", id: "{count} menit baca" },
  "Related Articles": { en: "Related Articles", id: "Artikel Terkait" },
  "Related articles": { en: "Related articles", id: "Artikel terkait" },
  Sustainability: { en: "Sustainability", id: "Keberlanjutan" },
  "Sustainability Consulting": {
    en: "Sustainability Consulting",
    id: "Konsultasi Keberlanjutan",
  },
  "Sustainability Journey?": {
    en: "Sustainability Journey?",
    id: "Perjalanan Keberlanjutan Anda?",
  },
  "Sustainability Reports": {
    en: "Sustainability Reports",
    id: "Laporan Keberlanjutan",
  },
  "Talk to an Expert": {
    en: "Talk to an Expert",
    id: "Konsultasikan dengan Ahli",
  },
  Tentang: { en: "About", id: "Tentang" },
  "The company introduction is temporarily unavailable. Please try again later.":
    {
      en: "The company introduction is temporarily unavailable. Please try again later.",
      id: "Pengenalan perusahaan untuk sementara tidak tersedia. Silakan coba lagi nanti.",
    },
  "The company photo is temporarily unavailable. Please try again later.": {
    en: "The company photo is temporarily unavailable. Please try again later.",
    id: "Foto perusahaan untuk sementara tidak tersedia. Silakan coba lagi nanti.",
  },
  "The contact service is unavailable.": {
    en: "The contact service is unavailable.",
    id: "Layanan kontak sedang tidak tersedia.",
  },
  "The API service is unavailable.": {
    en: "The API service is unavailable.",
    id: "Layanan API sedang tidak tersedia.",
  },
  "The API returned an unexpected response.": {
    en: "The API returned an unexpected response.",
    id: "API memberikan respons yang tidak terduga.",
  },
  "The API returned an error.": {
    en: "The API returned an error.",
    id: "API mengembalikan kesalahan.",
  },
  "This article cannot be displayed right now.": {
    en: "This article cannot be displayed right now.",
    id: "Artikel ini belum dapat ditampilkan.",
  },
  "This article is temporarily unavailable.": {
    en: "This article is temporarily unavailable.",
    id: "Artikel ini untuk sementara tidak tersedia.",
  },
  "Talk to Our Experts": {
    en: "Talk to Our Experts",
    id: "Konsultasikan dengan Ahli Kami",
  },
  "The API returned an invalid response.": {
    en: "The API returned an invalid response.",
    id: "API memberikan respons yang tidak valid.",
  },
  "The company profile is temporarily unavailable. Please try again later.": {
    en: "Company profile information is temporarily unavailable. Please try again later.",
    id: "Informasi profil perusahaan untuk sementara tidak tersedia. Silakan coba lagi nanti.",
  },
  "The company profile is not available at this time.": {
    en: "Company profile information is not available at this time.",
    id: "Informasi profil perusahaan belum tersedia saat ini.",
  },
  "The company photo is not available at this time.": {
    en: "A company photo is not available at this time.",
    id: "Foto perusahaan belum tersedia saat ini.",
  },
  "The company statistics are not available at this time.": {
    en: "Company statistics are not available at this time.",
    id: "Statistik perusahaan belum tersedia saat ini.",
  },
  "The service information is not available at this time.": {
    en: "Service information is not available at this time.",
    id: "Informasi layanan belum tersedia saat ini.",
  },
  "The service information is temporarily unavailable. Please try again later.":
    {
      en: "Service information is currently unavailable. Please try again later.",
      id: "Informasi layanan untuk sementara tidak tersedia. Silakan coba lagi nanti.",
    },
  "The service is temporarily unavailable. Please try again later.": {
    en: "Service information is currently unavailable. Please try again later.",
    id: "Informasi layanan untuk sementara tidak tersedia. Silakan coba lagi nanti.",
  },
  "The service divisions are temporarily unavailable.": {
    en: "Our service divisions are temporarily unavailable.",
    id: "Divisi layanan kami untuk sementara tidak tersedia.",
  },
  "The social and contact links": {
    en: "Social and contact links",
    id: "Tautan media sosial dan kontak",
  },
  "The website footer": { en: "Site footer", id: "Footer situs" },
  "There are no board members available at this time.": {
    en: "There are no board members available at this time.",
    id: "Belum ada anggota dewan yang tersedia saat ini.",
  },
  "There are no members listed for {type} yet.": {
    en: "There are no members listed for {type} yet.",
    id: "Belum ada anggota yang tercantum untuk {type}.",
  },
  "There are no published articles in this category yet.": {
    en: "There are no published articles in this category yet.",
    id: "Belum ada artikel yang dipublikasikan dalam kategori ini.",
  },
  "There are no published documents yet.": {
    en: "Published documents will appear here.",
    id: "Dokumen yang dipublikasikan akan ditampilkan di sini.",
  },
  "This category has no articles yet.": {
    en: "There are no published articles in this category yet.",
    id: "Belum ada artikel yang dipublikasikan dalam kategori ini.",
  },
  "This contact form is temporarily unavailable.": {
    en: "The contact form is temporarily unavailable.",
    id: "Formulir kontak untuk sementara tidak tersedia.",
  },
  "This page is not available right now.": {
    en: "This page is not available right now.",
    id: "Halaman ini belum tersedia saat ini.",
  },
  "This service is currently unavailable.": {
    en: "Service information is currently unavailable.",
    id: "Informasi layanan sedang tidak tersedia.",
  },
  "This service cannot be displayed right now.": {
    en: "This service cannot be displayed right now.",
    id: "Layanan ini belum dapat ditampilkan saat ini.",
  },
  "This service is temporarily unavailable.": {
    en: "This service is temporarily unavailable.",
    id: "Layanan ini untuk sementara tidak tersedia.",
  },
  "Unable to load FAQs": {
    en: "Unable to load FAQs",
    id: "FAQ tidak dapat dimuat",
  },
  Vision: { en: "Vision", id: "Visi" },
  "Vision & Mission": { en: "Vision & Mission", id: "Visi & Misi" },
  "Vision and mission information is not available at this time.": {
    en: "Vision and mission information is not available at this time.",
    id: "Informasi visi dan misi belum tersedia saat ini.",
  },
  "Vision and mission information is temporarily unavailable. Please try again later.":
    {
      en: "Vision and mission information is temporarily unavailable. Please try again later.",
      id: "Informasi visi dan misi untuk sementara tidak tersedia. Silakan coba lagi nanti.",
    },
  "Vision and mission are unavailable.": {
    en: "Vision and mission are unavailable.",
    id: "Informasi visi dan misi tidak tersedia.",
  },
  "We are proud to partner with leading organizations across various industries, driving energy efficiency and sustainability solutions together.":
    {
      en: "We are proud to partner with leading organizations across various industries, driving energy efficiency and sustainability solutions together.",
      id: "Kami bangga bermitra dengan organisasi terkemuka di berbagai industri untuk bersama-sama mendorong solusi efisiensi energi dan keberlanjutan.",
    },
  "We could not send your message. Please try again.": {
    en: "We could not send your message. Please try again.",
    id: "Pesan Anda belum dapat dikirim. Silakan coba lagi.",
  },
  "WhatsApp Us": { en: "WhatsApp Us", id: "Hubungi via WhatsApp" },
  "WHAT WE OFFER": { en: "WHAT WE OFFER", id: "LAYANAN KAMI" },
  "Your name": { en: "Your name", id: "Nama Anda" },
  About: { en: "About", id: "Tentang" },
  "About Us | PLN EMI": {
    en: "About Us | PLN EMI",
    id: "Tentang Kami | PLN EMI",
  },
  "Company profile is temporarily unavailable. Please try again later.": {
    en: "Company profile information is temporarily unavailable. Please try again later.",
    id: "Informasi profil perusahaan untuk sementara tidak tersedia. Silakan coba lagi nanti.",
  },
  "Energy management and environmental sustainability solutions from PT Energy Management Indonesia.":
    {
      en: "Energy management and environmental sustainability solutions from PT Energy Management Indonesia.",
      id: "Solusi manajemen energi dan keberlanjutan lingkungan dari PT Energy Management Indonesia.",
    },
  INDONESIA: { en: "INDONESIA", id: "INDONESIA" },
  "Koneba to PLN EMI — the milestones that shaped our journey as Indonesia's energy conservation pioneer.":
    {
      en: "From Koneba to PLN EMI — the milestones that shaped our journey as Indonesia's energy conservation pioneer.",
      id: "Dari Koneba hingga PLN EMI — tonggak perjalanan kami sebagai pelopor konservasi energi di Indonesia.",
    },
  "Load More Articles": {
    en: "Load More Articles",
    id: "Muat Lebih Banyak Artikel",
  },
  "News & Articles": { en: "News & Articles", id: "Berita & Artikel" },
  "News & Articles | PLN EMI": {
    en: "News & Articles | PLN EMI",
    id: "Berita & Artikel | PLN EMI",
  },
  "Our history": { en: "Our history", id: "Sejarah kami" },
  "Partners are temporarily unavailable.": {
    en: "Partners are temporarily unavailable.",
    id: "Informasi mitra untuk sementara tidak tersedia.",
  },
  "Partners are currently unavailable.": {
    en: "Partners are currently unavailable.",
    id: "Informasi mitra sedang tidak tersedia.",
  },
  "Privacy Policy": { en: "Privacy Policy", id: "Kebijakan Privasi" },
  "Read more": { en: "Read more", id: "Baca selengkapnya" },
  Services: { en: "Services", id: "Layanan" },
  "Services | PLN EMI": { en: "Services | PLN EMI", id: "Layanan | PLN EMI" },
  "Service information is currently unavailable. Please try again later.": {
    en: "Service information is currently unavailable. Please try again later.",
    id: "Informasi layanan sedang tidak tersedia. Silakan coba lagi nanti.",
  },
  "Service information is not available at this time.": {
    en: "Service information is not available at this time.",
    id: "Informasi layanan belum tersedia saat ini.",
  },
  "Service resources": { en: "Service resources", id: "Materi layanan" },
  "Social and contact links": {
    en: "Social and contact links",
    id: "Tautan media sosial dan kontak",
  },
  "Site footer": { en: "Site footer", id: "Footer situs" },
  "Thank you for reaching out. Our team will get back to you within 1–2 working days.":
    {
      en: "Thanks for reaching out. Our team will get back to you within 1–2 working days.",
      id: "Terima kasih telah menghubungi kami. Tim kami akan membalas dalam 1–2 hari kerja.",
    },
  "Unable to load message subjects. Please try again.": {
    en: "Unable to load message subjects. Please try again.",
    id: "Subjek pesan tidak dapat dimuat. Silakan coba lagi.",
  },
  "No message subjects are currently available.": {
    en: "No message subjects are currently available.",
    id: "Belum ada subjek pesan yang tersedia.",
  },
  "No FAQs are currently available.": {
    en: "No FAQs are currently available.",
    id: "Belum ada FAQ yang tersedia.",
  },
  "Please try again later.": {
    en: "Please try again later.",
    id: "Silakan coba lagi nanti.",
  },
  "Please check back later.": {
    en: "Please check back later.",
    id: "Silakan kunjungi kembali nanti.",
  },
  "Load more documents": {
    en: "Load more documents",
    id: "Muat lebih banyak dokumen",
  },
  "This article has an invalid publication date.": {
    en: "An article has an invalid publication date.",
    id: "Artikel memiliki tanggal terbit yang tidak valid.",
  },
  "An article is missing its slug.": {
    en: "An article is missing its slug.",
    id: "Artikel tidak memiliki slug.",
  },
  "Unable to load article content.": {
    en: "Article content is unavailable.",
    id: "Konten artikel tidak tersedia.",
  },
  "Our team can map the right service mix for your sustainability goals.": {
    en: "Our team can map the right service mix for your sustainability goals.",
    id: "Tim kami dapat membantu menentukan kombinasi layanan yang tepat untuk tujuan keberlanjutan Anda.",
  },
  "NOT SURE WHERE TO START?": {
    en: "NOT SURE WHERE TO START?",
    id: "BELUM TAHU HARUS MULAI DARI MANA?",
  },
  "Keep Reading": { en: "Keep Reading", id: "Lanjutkan Membaca" },
  "Latest articles": { en: "Latest articles", id: "Artikel terbaru" },
  "More articles": { en: "More articles", id: "Artikel lainnya" },
  "Articles are temporarily unavailable.": {
    en: "Articles are temporarily unavailable.",
    id: "Artikel untuk sementara tidak tersedia.",
  },
  "Article updates are currently unavailable.": {
    en: "Article updates are currently unavailable.",
    id: "Informasi artikel sedang tidak tersedia.",
  },
  "Our service divisions are temporarily unavailable.": {
    en: "Our service divisions are temporarily unavailable.",
    id: "Divisi layanan kami untuk sementara tidak tersedia.",
  },
  "Clients logos are currently unavailable.": {
    en: "Client logos are currently unavailable.",
    id: "Logo klien sedang tidak tersedia.",
  },
  "Client logos are currently unavailable.": {
    en: "Client logos are currently unavailable.",
    id: "Logo klien sedang tidak tersedia.",
  },
  "Ready to Start Your": { en: "Ready to Start Your", id: "Siap Memulai" },
  "Send Us a Message": {
    en: "Send Us a Message",
    id: "Kirim Pesan kepada Kami",
  },
  "Full Name": { en: "Full Name", id: "Nama Lengkap" },
  Name: { en: "Name", id: "Nama" },
  "name@company.com": { en: "name@company.com", id: "nama@perusahaan.com" },
  "Company name": { en: "Company name", id: "Nama perusahaan" },
  Phone: { en: "Phone", id: "Telepon" },
  Subject: { en: "Subject", id: "Subjek" },
  Message: { en: "Message", id: "Pesan" },
  "Tell us about your needs...": {
    en: "Tell us about your needs...",
    id: "Ceritakan kebutuhan Anda...",
  },
  "Send Message": { en: "Send Message", id: "Kirim Pesan" },
  "Sending...": { en: "Sending...", id: "Mengirim..." },
  "Select a subject": { en: "Select a subject", id: "Pilih subjek" },
  "Reload page": { en: "Reload page", id: "Muat ulang halaman" },
  "Thanks for reaching out. Our team will get back to you within 1–2 working days.":
    {
      en: "Thanks for reaching out. Our team will get back to you within 1–2 working days.",
      id: "Terima kasih telah menghubungi kami. Tim kami akan membalas dalam 1–2 hari kerja.",
    },
  required: { en: "required", id: "wajib diisi" },
  "This content is temporarily unavailable.": {
    en: "This content is temporarily unavailable.",
    id: "Konten ini untuk sementara tidak tersedia.",
  },
  "There is no content available at this time.": {
    en: "There is no content available at this time.",
    id: "Konten belum tersedia saat ini.",
  },
  "This content is unavailable.": {
    en: "This content is unavailable.",
    id: "Konten tidak tersedia.",
  },
  "No content found.": {
    en: "No content found.",
    id: "Konten tidak ditemukan.",
  },
  "Page not found": {
    en: "Page not found",
    id: "Halaman tidak ditemukan",
  },
  "The page you’re looking for doesn’t exist or may have moved.": {
    en: "The page you’re looking for doesn’t exist or may have moved.",
    id: "Halaman yang Anda cari tidak ditemukan atau mungkin telah dipindahkan.",
  },
  "Back to home.": { en: "Back to home.", id: "Kembali ke Beranda." },
  "No partners are available yet.": {
    en: "No partners are available yet.",
    id: "Belum ada mitra yang tersedia.",
  },
  "No documents found.": {
    en: "No documents found.",
    id: "Dokumen tidak ditemukan.",
  },
  "Download PDF": { en: "Download PDF", id: "Unduh PDF" },
  "Unduh PDF": { en: "Download PDF", id: "Unduh PDF" },
  Document: { en: "Document", id: "Dokumen" },
  "Tanggal tidak tersedia": {
    en: "Date unavailable",
    id: "Tanggal tidak tersedia",
  },
  "Berita dan": { en: "News and", id: "Berita dan" },
  Artikel: { en: "Articles", id: "Artikel" },
  Layanan: { en: "Services", id: "Layanan" },
  "Belum ada dokumen komitmen.": {
    en: "No commitment documents are available yet.",
    id: "Belum ada dokumen komitmen.",
  },
  "The article cannot be displayed right now.": {
    en: "This article cannot be displayed right now.",
    id: "Artikel ini belum dapat ditampilkan saat ini.",
  },
  "Open profile for {name}": {
    en: "Open profile for {name}",
    id: "Buka profil {name}",
  },
  "{name} portrait": { en: "{name} portrait", id: "Potret {name}" },
  "HEAD OFFICE": { en: "HEAD OFFICE", id: "KANTOR PUSAT" },
  "PHONE / WHATSAPP": { en: "PHONE / WHATSAPP", id: "TELEPON / WHATSAPP" },
  "OFFICE HOURS": { en: "OFFICE HOURS", id: "JAM OPERASIONAL" },
  EMAIL: { en: "EMAIL", id: "EMAIL" },
  "EMAIL:": { en: "EMAIL:", id: "EMAIL:" },
  "TELP:": { en: "PHONE:", id: "TELEPON:" },
  "COMPANY PROFILE": { en: "COMPANY PROFILE", id: "PROFIL PERUSAHAAN" },
  "PART OF": { en: "PART OF", id: "BAGIAN DARI" },
  "OUR HISTORY": { en: "OUR HISTORY", id: "SEJARAH KAMI" },
  DIRECTION: { en: "DIRECTION", id: "ARAH PERUSAHAAN" },
  MANAJEMEN: { en: "MANAGEMENT", id: "MANAJEMEN" },
  "SEKILAS EMI": { en: "ABOUT EMI", id: "SEKILAS EMI" },
  "Muat lebih banyak artikel": {
    en: "Load more articles",
    id: "Muat lebih banyak artikel",
  },
  "Energy management and environmental sustainability solutions.": {
    en: "Energy management and environmental sustainability solutions.",
    id: "Solusi manajemen energi dan keberlanjutan lingkungan.",
  },
  "Since 1987, supporting Indonesia's national energy efficiency program — and since 2021, managing Green Instruments and Carbon Economic Values across the PLN Group.":
    {
      en: "Since 1987, supporting Indonesia's national energy efficiency program — and since 2021, managing Green Instruments and Carbon Economic Values across the PLN Group.",
      id: "Sejak 1987 mendukung program efisiensi energi nasional Indonesia, dan sejak 2021 mengelola Instrumen Hijau serta Nilai Ekonomi Karbon di lingkungan PLN Group.",
    },
  "From Koneba to PLN EMI — the milestones that shaped our journey as Indonesia's energy conservation pioneer.":
    {
      en: "From Koneba to PLN EMI — the milestones that shaped our journey as Indonesia's energy conservation pioneer.",
      id: "Dari Koneba hingga PLN EMI — tonggak perjalanan kami sebagai pelopor konservasi energi di Indonesia.",
    },
  "Sejarah Kami": { en: "Our History", id: "Sejarah Kami" },
  "Manajemen Perusahaan": {
    en: "Company Management",
    id: "Manajemen Perusahaan",
  },
  "Certifications, corporate policies, and sustainability reports — the documents behind our promises, available for download.":
    {
      en: "Certifications, corporate policies, and sustainability reports — the documents behind our promises, available for download.",
      id: "Sertifikasi, kebijakan perusahaan, dan laporan keberlanjutan yang mewujudkan komitmen kami dan tersedia untuk diunduh.",
    },
  "Certifications, corporate policies, and sustainability reports — the documents behind our promises.":
    {
      en: "Certifications, corporate policies, and sustainability reports — the documents behind our promises.",
      id: "Sertifikasi, kebijakan perusahaan, dan laporan keberlanjutan yang menjadi bukti komitmen kami.",
    },
  "Our company introduction": {
    en: "Our company introduction",
    id: "Pengenalan perusahaan kami",
  },
  "This is a required field.": {
    en: "This is a required field.",
    id: "Kolom ini wajib diisi.",
  },
  "Service tag navigation": {
    en: "Service tag navigation",
    id: "Navigasi layanan",
  },
  "Next service tag": { en: "Next service tag", id: "Layanan berikutnya" },
  "Next image": { en: "Next image", id: "Gambar berikutnya" },
  "Next slide": { en: "Next slide", id: "Slide berikutnya" },
  "Show slide {index}: {mainTitle} {subtitle}": {
    en: "Show slide {index}: {mainTitle} {subtitle}",
    id: "Tampilkan slide {index}: {mainTitle} {subtitle}",
  },
  "Danantara Indonesia home": {
    en: "Danantara Indonesia home",
    id: "Beranda Danantara Indonesia",
  },
  "PLN Energy Management Indonesia home": {
    en: "PLN Energy Management Indonesia home",
    id: "Beranda PLN Energy Management Indonesia",
  },
  "Language selector": { en: "Language selector", id: "Pemilih bahasa" },
  "Mobile navigation": { en: "Mobile navigation", id: "Navigasi seluler" },
  "Explore PLN EMI's service divisions and solutions for energy management and environmental sustainability.":
    {
      en: "Explore PLN EMI's service divisions and solutions for energy management and environmental sustainability.",
      id: "Jelajahi divisi layanan PLN EMI dan solusi manajemen energi serta keberlanjutan lingkungan.",
    },
  "Explore PLN EMI certifications, corporate policies, and sustainability reports.":
    {
      en: "Explore PLN EMI certifications, corporate policies, and sustainability reports.",
      id: "Jelajahi sertifikasi, kebijakan perusahaan, dan laporan keberlanjutan PLN EMI.",
    },
  "Trusted updates on PLN EMI business developments, innovation, and contribution to energy resilience and sustainable growth.":
    {
      en: "Trusted updates on PLN EMI business developments, innovation, and contribution to energy resilience and sustainable growth.",
      id: "Informasi tepercaya tentang perkembangan bisnis, inovasi, dan kontribusi PLN EMI bagi ketahanan energi dan pertumbuhan berkelanjutan.",
    },
  "Trusted updates on business developments, innovation, and our contribution to energy resilience and sustainable growth.":
    {
      en: "Trusted updates on business developments, innovation, and our contribution to energy resilience and sustainable growth.",
      id: "Informasi tepercaya tentang perkembangan bisnis, inovasi, dan kontribusi kami bagi ketahanan energi dan pertumbuhan berkelanjutan.",
    },
  "See All News": { en: "See All News", id: "Lihat Semua Berita" },
  "MEDIA & INFORMATION": { en: "MEDIA & INFORMATION", id: "MEDIA & INFORMASI" },
  Articles: { en: "Articles", id: "Artikel" },
  "Vision information is not available at this time.": {
    en: "Vision information is not available at this time.",
    id: "Informasi visi belum tersedia saat ini.",
  },
  "Mission information is not available at this time.": {
    en: "Mission information is not available at this time.",
    id: "Informasi misi belum tersedia saat ini.",
  },
  "Company photo is not available at this time.": {
    en: "Company photo is not available at this time.",
    id: "Foto perusahaan belum tersedia saat ini.",
  },
  Divisions: { en: "Divisions", id: "Divisi" },
  "Our service divisions": {
    en: "Our service divisions",
    id: "Divisi layanan kami",
  },
  Explore: { en: "Explore", id: "Jelajahi" },
  "Konsultasikan Layanan Ini": {
    en: "Discuss This Service",
    id: "Konsultasikan Layanan Ini",
  },
  "All services": { en: "All services", id: "Semua layanan" },
  "News, Insights & Press Releases": {
    en: "News, Insights & Press Releases",
    id: "Berita, Wawasan & Siaran Pers",
  },
  "Certifications, Policies & Reports": {
    en: "Certifications, Policies & Reports",
    id: "Sertifikasi, Kebijakan & Laporan",
  },
  "Certifications & Ratings": {
    en: "Certifications & Ratings",
    id: "Sertifikasi & Peringkat",
  },
  "ISO certifications and accreditations reflecting our solid performance.": {
    en: "ISO certifications and accreditations reflecting our solid performance.",
    id: "Sertifikasi dan akreditasi ISO yang mencerminkan kinerja kami.",
  },
  "Governance, HSE, and ethics policies that guide how we work every day.": {
    en: "Governance, HSE, and ethics policies that guide how we work every day.",
    id: "Kebijakan tata kelola, K3L, dan etika yang menjadi pedoman kerja kami.",
  },
  COMMITMENT: { en: "COMMITMENT", id: "KOMITMEN" },
  Komitmen: { en: "Commitment", id: "Komitmen" },
  "Silakan coba lagi beberapa saat.": {
    en: "Please try again later.",
    id: "Silakan coba lagi beberapa saat.",
  },
  "6281234567890": { en: "6281234567890", id: "6281234567890" },
  "PT Energy Management Indonesia (Persero)": {
    en: "PT Energy Management Indonesia (Persero)",
    id: "PT Energy Management Indonesia (Persero)",
  },
  "All rights reserved.": {
    en: "All rights reserved.",
    id: "Hak cipta dilindungi.",
  },
  "Waste Circularity": { en: "Waste Circularity", id: "Sirkularitas Limbah" },
  "Press Releases": { en: "Press Releases", id: "Siaran Pers" },
  Certifications: { en: "Certifications", id: "Sertifikasi" },
  LinkedIn: { en: "LinkedIn", id: "LinkedIn" },
  YouTube: { en: "YouTube", id: "YouTube" },
  "Back to News": { en: "Back to News", id: "Kembali ke Berita" },
  "No document category": { en: "Document", id: "Dokumen" },
  "An article has an invalid publication date.": {
    en: "An article has an invalid publication date.",
    id: "Artikel memiliki tanggal terbit yang tidak valid.",
  },
  "Indonesian article content is unavailable.": {
    en: "Article content is unavailable in this language.",
    id: "Konten artikel tidak tersedia dalam bahasa ini.",
  },
  Documents: { en: "Documents", id: "Dokumen" },
  "No document available": {
    en: "No document available",
    id: "Dokumen tidak tersedia",
  },
  "Our commitment resources": {
    en: "Our commitment resources",
    id: "Materi komitmen kami",
  },
  "Site title": { en: "PLN EMI", id: "PLN EMI" },
  "Site description": {
    en: "PT Energy Management Indonesia sustainability and energy efficiency solutions.",
    id: "Solusi manajemen energi dan efisiensi energi berkelanjutan dari PT Energy Management Indonesia.",
  },
  "Explore {code}": { en: "Explore {code}", id: "Jelajahi {code}" },
  "{title} images": { en: "{title} images", id: "Gambar {title}" },
  "Service tag {index} of {count}": {
    en: "Service tag {index} of {count}",
    id: "Layanan {index} dari {count}",
  },
  "Open {title} details": {
    en: "Open {title} details",
    id: "Buka detail {title}",
  },
  "{title} offerings": { en: "{title} offerings", id: "Layanan {title}" },
  "Read {title}": { en: "Read {title}", id: "Baca {title}" },
  "Commitment documents": {
    en: "Commitment documents",
    id: "Dokumen komitmen",
  },
  "Open {title} PDF in a new tab": {
    en: "Open {title} PDF in a new tab",
    id: "Buka PDF {title} di tab baru",
  },
  "Danantara Indonesia": {
    en: "Danantara Indonesia",
    id: "Danantara Indonesia",
  },
  "PLN Energy Management Indonesia": {
    en: "PLN Energy Management Indonesia",
    id: "PLN Energy Management Indonesia",
  },
  Required: { en: "required", id: "wajib diisi" },
  "Email:": { en: "Email:", id: "Email:" },
  "Telp:": { en: "Phone:", id: "Telepon:" },
  "Services page title": { en: "Our", id: "Layanan" },
  "Services page title accent": { en: "Services", id: "Kami" },
  "Commitment page title": { en: "Commitment", id: "Dokumen" },
  "Commitment page title accent": { en: "Documents", id: "Komitmen" },
  "Commitment heading title": { en: "Our", id: "Komitmen" },
  "Commitment heading accent": { en: "Commitment", id: "Kami" },
  "Partners heading title": { en: "Our", id: "Klien" },
  "Partners heading accent": { en: "Clients", id: "Kami" },
  "from {company}": { en: "from {company}", id: "dari {company}" },
  X: { en: "X", id: "X" },
  "Learn about PT Energy Management Indonesia (Persero), our history, direction, and management team.":
    {
      en: "Learn about PT Energy Management Indonesia (Persero), our history, direction, and management team.",
      id: "Pelajari PT Energy Management Indonesia (Persero), sejarah, arah, dan jajaran manajemen kami.",
    },
  "Connect with PLN EMI's team of experts for energy efficiency, compliance, and climate action support.":
    {
      en: "Connect with PLN EMI's team of experts for energy efficiency, compliance, and climate action support.",
      id: "Hubungi tim ahli PLN EMI untuk mendapatkan dukungan terkait efisiensi energi, kepatuhan, dan aksi iklim.",
    },
  "Services section title": { en: "Our Service", id: "Divisi Layanan" },
  "Services section accent": { en: "Divisions", id: "Kami" },
  "Articles section title": { en: "Our Latest", id: "Berita" },
  "Articles section accent": { en: "Articles", id: "Terbaru" },
  PLN: { en: "PLN", id: "PLN" },
  "Energy Management": { en: "Energy Management", id: "Manajemen Energi" },
  Indonesia: { en: "Indonesia", id: "Indonesia" },
};

export function getMessages(locale: Locale) {
  const copy = Object.fromEntries(
    Object.entries(phrases).map(([source, localized]) => [
      getCopyKey(source),
      localized[locale],
    ]),
  );

  return { copy };
}
