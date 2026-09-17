'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjects, deleteProject } from '@/lib/firestore';
import { Project } from '@/types';
import { Plus, Trash2, Edit, LogIn, LogOut, Cloud } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (user) {
      setFetching(true);
      getProjects(user.uid)
        .then((data) => {
          setProjects(data);
          setFetching(false);
        })
        .catch((error) => {
          console.error("Error fetching projects", error);
          setFetching(false);
        });
    } else {
      setProjects([]);
      setFetching(false);
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!user) return;
    if (confirm('Apakah Anda yakin ingin menghapus proyek ini secara permanen dari Cloud?')) {
      await deleteProject(id, user.uid);
      const data = await getProjects(user.uid);
      setProjects(data);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold text-xl">Memuat HitungIN...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 mt-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-4xl font-extrabold text-primary tracking-tight">HitungIN</h1>
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Cloud size={12} /> Cloud Sync
              </span>
            </div>
            <p className="text-gray-500 font-medium text-sm md:text-base">Kalkulator HPP & Margin Profit</p>
          </div>
          
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 mr-2">
                  {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" />}
                  <div className="hidden sm:block text-sm font-bold text-gray-700">{user.displayName}</div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-red-500 bg-gray-100 hover:bg-red-50 rounded-xl transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
                <Link
                  href="/project/new"
                  className="flex items-center gap-2 bg-secondary text-white font-semibold px-5 py-3 rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
                  <Plus size={20} strokeWidth={2.5} />
                  <span className="hidden sm:inline">Produk Baru</span>
                </Link>
              </>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="flex items-center gap-2 bg-white text-gray-800 border border-gray-200 font-bold px-5 py-3 rounded-2xl shadow-sm hover:bg-gray-50 transition-all"
              >
                <LogIn size={20} />
                Login Google
              </button>
            )}
          </div>
        </header>

        {!user ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100/50">
            <div className="bg-accent/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cloud size={32} className="text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Simpan ke Cloud</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Login dengan akun Google untuk menyimpan data HPP Anda secara online agar bisa dibuka dari HP atau laptop mana saja.</p>
            <button
              onClick={loginWithGoogle}
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-2xl hover:bg-primary-light transition-colors shadow-sm hover:shadow-md"
            >
              <LogIn size={20} />
              Mulai Sekarang (Gratis)
            </button>
          </div>
        ) : fetching ? (
          <div className="text-center py-20 text-gray-500 font-medium animate-pulse">Menyinkronkan data dari cloud...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100/50">
            <div className="bg-accent/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus size={32} className="text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum ada produk</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Mulai hitung Harga Pokok Produksi</p>
            <Link
              href="/project/new"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-2xl hover:bg-primary-light transition-colors shadow-sm hover:shadow-md"
            >
              <Plus size={20} />
              Buat Proyek
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all group hover:-translate-y-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">{project.name}</h3>
                {project.description && <p className="text-sm text-gray-500 mb-5 line-clamp-2">{project.description}</p>}
                
                <div className="space-y-3 mb-6 bg-gray-50/50 p-4 rounded-2xl">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Porsi / Unit</span>
                    <span className="font-bold text-gray-800 bg-white px-2 py-1 rounded-lg border border-gray-100">{project.portions}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Harga Jual</span>
                    <span className="font-bold text-success">{formatCurrency(project.targetSellingPrice)}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
                  <Link
                    href={`/project/${project.id}`}
                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    title="Hapus"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
