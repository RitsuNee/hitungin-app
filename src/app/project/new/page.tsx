'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveProject } from '@/lib/firestore';
import { Project } from '@/types';
import Link from 'next/link';
import { ArrowLeft, PackagePlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function NewProject() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [portions, setPortions] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSaving) return;

    setIsSaving(true);
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      description,
      portions,
      ingredients: [],
      operationalCost: 0,
      targetSellingPrice: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    try {
      await saveProject(user.uid, newProject);
      router.push(`/project/${newProject.id}`);
    } catch (error) {
      console.error("Error saving project", error);
      alert("Gagal menyimpan proyek. Pastikan Firestore rules Anda mengizinkan penulisan.");
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto mt-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-medium transition-colors">
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100/50 p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-accent/20 p-4 rounded-2xl text-secondary">
              <PackagePlus size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Detail Produk Baru</h1>
              <p className="text-sm text-gray-500 font-medium">Lengkapi identitas produk yang mau dihitung HPP-nya.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                Nama Produk *
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="misal: Kue Cokelat Lumer"
                className="w-full px-5 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">
                Deskripsi Singkat (Opsional)
              </label>
              <textarea
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="misal: Resep andalan untuk jualan akhir pekan"
                className="w-full px-5 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label htmlFor="portions" className="block text-sm font-bold text-gray-700 mb-2">
                Jumlah Porsi / Unit Dihasilkan *
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="portions"
                  type="number"
                  min="1"
                  required
                  value={portions}
                  onChange={(e) => setPortions(parseInt(e.target.value) || 1)}
                  className="w-32 px-5 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-center"
                />
                <span className="text-gray-500 font-medium">porsi / boks / buah</span>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-primary text-white font-bold text-lg py-4 rounded-2xl hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-70 disabled:transform-none"
              >
                {isSaving ? 'Menyimpan ke Cloud...' : 'Mulai Hitung HPP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
