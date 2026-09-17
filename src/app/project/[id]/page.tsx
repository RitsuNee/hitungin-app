'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProject, saveProject } from '@/lib/firestore';
import { Project, Ingredient } from '@/types';
import { ArrowLeft, Plus, Trash2, Save, Calculator, CheckCircle2, AlertTriangle, XCircle, ShoppingBag, Cloud } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  
  const [project, setProject] = useState<Project | null>(null);
  const [fetching, setFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form states for new ingredient
  const [ingName, setIngName] = useState('');
  const [ingPrice, setIngPrice] = useState('');
  const [ingPurAmount, setIngPurAmount] = useState('');
  const [ingPurUnit, setIngPurUnit] = useState('gram');
  const [ingUsedAmount, setIngUsedAmount] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/');
      return;
    }

    getProject(id, user.uid).then((data) => {
      if (data) {
        setProject(data);
      } else {
        alert("Proyek tidak ditemukan atau Anda tidak memiliki akses.");
        router.push('/');
      }
      setFetching(false);
    }).catch(err => {
      console.error(err);
      setFetching(false);
    });
  }, [id, user, authLoading, router]);

  const handleSave = async () => {
    if (project && user) {
      setIsSaving(true);
      try {
        await saveProject(user.uid, project);
        alert('Tersimpan di Cloud!');
      } catch (err) {
        console.error(err);
        alert('Gagal menyimpan ke Cloud.');
      }
      setIsSaving(false);
    }
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !ingName || !ingPrice || !ingPurAmount || !ingUsedAmount) return;

    const price = parseFloat(ingPrice);
    const pAmount = parseFloat(ingPurAmount);
    const uAmount = parseFloat(ingUsedAmount);

    if (pAmount <= 0) return;

    const calculatedCost = (price / pAmount) * uAmount;

    const newIng: Ingredient = {
      id: Date.now().toString(),
      name: ingName,
      purchasePrice: price,
      purchaseAmount: pAmount,
      purchaseUnit: ingPurUnit,
      usedAmount: uAmount,
      usedUnit: ingPurUnit,
      calculatedCost: calculatedCost,
    };

    setProject({
      ...project,
      ingredients: [...project.ingredients, newIng],
    });

    setIngName('');
    setIngPrice('');
    setIngPurAmount('');
    setIngUsedAmount('');
  };

  const handleDeleteIngredient = (ingId: string) => {
    if (!project) return;
    setProject({
      ...project,
      ingredients: project.ingredients.filter((i) => i.id !== ingId),
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  if (authLoading || fetching || !project) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-primary font-bold text-xl flex items-center gap-2">
        <Cloud className="animate-bounce" /> Memuat dari Cloud...
      </div>
    </div>
  );

  const totalBahanBaku = project.ingredients.reduce((acc, curr) => acc + curr.calculatedCost, 0);
  const totalBiayaProduksi = totalBahanBaku + project.operationalCost;
  const biayaPerPorsi = totalBiayaProduksi / (project.portions || 1);
  
  const totalPendapatan = project.targetSellingPrice * project.portions;
  const keuntunganBersih = totalPendapatan - totalBiayaProduksi;
  const marginProfit = totalPendapatan > 0 ? (keuntunganBersih / totalPendapatan) * 100 : 0;

  return (
    <main className="min-h-screen bg-background p-4 md:p-6 pb-24 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-medium transition-colors">
            <ArrowLeft size={20} />
            Kembali
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-success text-white font-bold px-6 py-2.5 rounded-xl hover:bg-success-light hover:-translate-y-0.5 hover:shadow-md transition-all disabled:opacity-70 disabled:transform-none"
          >
            <Save size={20} />
            {isSaving ? 'Menyimpan...' : 'Simpan ke Cloud'}
          </button>
        </div>

        {/* Header Project */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-6 md:p-8 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center text-secondary shrink-0">
              <ShoppingBag size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{project.name}</h1>
              {project.description && <p className="text-gray-500 mt-1 font-medium">{project.description}</p>}
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 min-w-[140px] text-center">
            <div className="text-sm text-gray-500 font-bold mb-1">Total Porsi/Unit</div>
            <div className="text-3xl font-extrabold text-primary">{project.portions}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri: Input Bahan & Operasional */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Form Tambah Bahan */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-6 md:p-8">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6">Komposisi Bahan Baku</h2>
              
              <form onSubmit={handleAddIngredient} className="bg-primary/5 p-5 md:p-6 rounded-2xl mb-8 border border-primary/10">
                <h3 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider">Tambah Bahan Baru</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">NAMA BAHAN</label>
                    <input type="text" required value={ingName} onChange={(e) => setIngName(e.target.value)} placeholder="Tepung Terigu" className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">HARGA BELI (Rp)</label>
                    <input type="number" required min="0" value={ingPrice} onChange={(e) => setIngPrice(e.target.value)} placeholder="15000" className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">KUANTITAS BELI</label>
                      <input type="number" required min="0.01" step="any" value={ingPurAmount} onChange={(e) => setIngPurAmount(e.target.value)} placeholder="1000" className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium" />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">SATUAN</label>
                      <select value={ingPurUnit} onChange={(e) => setIngPurUnit(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium">
                        <option value="gram">gr</option>
                        <option value="kg">kg</option>
                        <option value="ml">ml</option>
                        <option value="liter">L</option>
                        <option value="pcs">pcs</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">TAKARAN DIPAKAI</label>
                    <div className="flex items-center gap-3">
                      <input type="number" required min="0.01" step="any" value={ingUsedAmount} onChange={(e) => setIngUsedAmount(e.target.value)} placeholder="250" className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium" />
                      <span className="text-sm font-bold text-gray-500 w-10">{ingPurUnit}</span>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full flex justify-center items-center gap-2 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-light transition-all hover:shadow-md">
                  <Plus size={18} /> Masukkan ke Resep
                </button>
              </form>

              {/* Tabel Bahan */}
              <div className="overflow-x-auto rounded-2xl border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-5 py-4">Bahan</th>
                      <th className="px-5 py-4 hidden sm:table-cell">Data Beli</th>
                      <th className="px-5 py-4">Pakai</th>
                      <th className="px-5 py-4 text-right">Biaya (Rp)</th>
                      <th className="px-5 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {project.ingredients.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-400 font-medium">Belum ada bahan baku. Tambahkan di atas.</td>
                      </tr>
                    ) : (
                      project.ingredients.map((ing) => (
                        <tr key={ing.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-4 font-bold text-gray-800">{ing.name}</td>
                          <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">
                            {formatCurrency(ing.purchasePrice)} / {ing.purchaseAmount}{ing.purchaseUnit}
                          </td>
                          <td className="px-5 py-4 font-medium text-gray-700">
                            {ing.usedAmount}
                            <span className="text-gray-400 ml-1 text-xs">{ing.usedUnit}</span>
                          </td>
                          <td className="px-5 py-4 text-right font-extrabold text-primary">{formatCurrency(ing.calculatedCost)}</td>
                          <td className="px-5 py-4 text-right">
                            <button onClick={() => handleDeleteIngredient(ing.id)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot className="bg-gray-50/80 font-bold text-gray-800">
                    <tr>
                      <td colSpan={2} className="px-5 py-4 hidden sm:table-cell"></td>
                      <td className="px-5 py-4 text-right text-gray-500 uppercase text-xs tracking-wider">Total Bahan:</td>
                      <td className="px-5 py-4 text-right text-lg">{formatCurrency(totalBahanBaku)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Operasional */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-6 md:p-8">
              <h2 className="text-xl font-extrabold text-gray-900 mb-2">Biaya Operasional <span className="text-gray-400 text-sm font-normal ml-2">(Opsional)</span></h2>
              <p className="text-sm text-gray-500 mb-6 font-medium">Biaya tambahan per-resep (kemasan, gas, listrik, dll).</p>
              
              <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all max-w-sm">
                <span className="text-gray-500 font-bold pl-4 pr-2">Rp</span>
                <input
                  type="number"
                  min="0"
                  value={project.operationalCost || ''}
                  onChange={(e) => setProject({ ...project, operationalCost: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-full py-3 bg-transparent font-bold text-gray-800 outline-none"
                />
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Analisis Keuntungan & Harga Jual */}
          <div className="space-y-6">
            
            {/* Simulasi Harga Jual */}
            <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl shadow-md p-8 text-white relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
              
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-primary-50 relative z-10">
                <Calculator size={22} className="text-accent" />
                Harga Jual Target <span className="text-xs font-normal opacity-80">(per porsi)</span>
              </h2>
              <p className="text-primary-100 text-sm mb-6 font-medium relative z-10 opacity-80">
                Ketik nominal harga jual yang ingin disimulasikan.
              </p>
              
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20 relative z-10 focus-within:bg-white/20 transition-all">
                <span className="text-xl font-extrabold pl-3 text-accent">Rp</span>
                <input
                  type="number"
                  min="0"
                  value={project.targetSellingPrice || ''}
                  onChange={(e) => setProject({ ...project, targetSellingPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-transparent text-3xl font-extrabold text-white placeholder-white/30 outline-none"
                  placeholder="20000"
                />
              </div>
            </div>

            {/* Laporan & Analisis */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-6 md:p-8">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6">Laporan Profit</h2>
              
              <div className="space-y-4 font-medium text-sm">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500">Modal Bahan Baku</span>
                  <span className="font-bold text-gray-800">{formatCurrency(totalBahanBaku)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500">Biaya Operasional</span>
                  <span className="font-bold text-gray-800">{formatCurrency(project.operationalCost)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-800 font-extrabold">Total Biaya Produksi</span>
                  <span className="font-extrabold text-secondary text-base">{formatCurrency(totalBiayaProduksi)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500">Biaya Modal <span className="text-xs">/ porsi</span></span>
                  <span className="font-bold text-gray-800 bg-gray-50 px-3 py-1 rounded-lg">{formatCurrency(biayaPerPorsi)}</span>
                </div>
                
                <div className="pt-6 space-y-4">
                  <div className={`p-5 rounded-2xl border ${keuntunganBersih > 0 ? 'bg-success/10 border-success/20' : keuntunganBersih < 0 ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="text-sm font-bold text-gray-600 mb-1">Keuntungan Bersih (Total)</div>
                    <div className={`text-3xl font-extrabold tracking-tight ${keuntunganBersih > 0 ? 'text-success' : keuntunganBersih < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                      {formatCurrency(keuntunganBersih)}
                    </div>
                    <div className="text-xs font-semibold text-gray-500 mt-2 opacity-80 uppercase tracking-wider">Bila terjual {project.portions} porsi</div>
                  </div>

                  <div className={`p-5 rounded-2xl border ${marginProfit >= 30 ? 'bg-success/10 border-success/20' : marginProfit > 0 ? 'bg-accent/10 border-accent/30' : 'bg-red-50 border-red-100'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-bold text-gray-600 mb-1">Margin Profit</div>
                        <div className={`text-3xl font-extrabold tracking-tight ${marginProfit >= 30 ? 'text-success' : marginProfit > 0 ? 'text-secondary' : 'text-red-600'}`}>
                          {marginProfit.toFixed(1)}%
                        </div>
                      </div>
                      <div className="mt-2">
                        {marginProfit >= 50 ? (
                          <CheckCircle2 size={32} className="text-success" />
                        ) : marginProfit >= 30 ? (
                          <CheckCircle2 size={32} className="text-success opacity-80" />
                        ) : marginProfit > 0 ? (
                          <AlertTriangle size={32} className="text-secondary" />
                        ) : (
                          <XCircle size={32} className="text-red-500" />
                        )}
                      </div>
                    </div>
                    <div className={`text-sm font-bold mt-3 ${marginProfit >= 50 ? 'text-success' : marginProfit >= 30 ? 'text-success' : marginProfit > 0 ? 'text-secondary' : 'text-red-600'}`}>
                      {marginProfit >= 50 ? 'Sangat Menguntungkan!' : marginProfit >= 30 ? 'Margin Ideal / Standar' : marginProfit > 0 ? 'Margin Terlalu Kecil' : 'Rugi! Naikkan Harga Jual'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
