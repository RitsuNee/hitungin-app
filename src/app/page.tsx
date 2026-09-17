'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjects, deleteProject } from '@/lib/storage';
import { Project } from '@/types';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      deleteProject(id);
      setProjects(getProjects());
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10 mt-4">
          <div>
            <h1 className="text-4xl font-extrabold text-primary mb-1 tracking-tight">HitungIN</h1>
            <p className="text-gray-500 font-medium text-sm md:text-base">Kalkulator HPP & Margin Profit</p>
          </div>
          <Link
            href="/project/new"
            className="flex items-center gap-2 bg-secondary text-white font-semibold px-5 py-3 rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
          >
            <Plus size={20} strokeWidth={2.5} />
            <span className="hidden sm:inline">Hitung Produk Baru</span>
            <span className="sm:hidden">Baru</span>
          </Link>
        </header>

        {projects.length === 0 ? (
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
