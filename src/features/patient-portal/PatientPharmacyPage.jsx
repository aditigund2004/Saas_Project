import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Pill,
  Sparkles
} from 'lucide-react';
import { DEMO_PHARMACY_CATALOG, PHARMACY_CATEGORIES } from '../../demo-data/pharmacyCatalog';

export function PatientPharmacyPage() {
  const {
    prescriptions = [],
    currentUser,
    activeClinic,
    medicineOrders = [],
    createMedicineOrder,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'prescriptions' | 'orders'
  const [selectedCategory, setSelectedCategory] = useState('All Medicines');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPrescriptionOnly, setFilterPrescriptionOnly] = useState(false);

  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMedicineForDetail, setSelectedMedicineForDetail] = useState(null);

  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('Standard Delivery');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [deliveryAddress, setDeliveryAddress] = useState(
    'Flat 402, Sea Green Heights, Shivaji Park, Dadar West, Mumbai 400028'
  );
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Patient prescriptions
  const myPrescriptions = useMemo(() => {
    return prescriptions.filter(
      (p) => p.patientName === currentUser?.name || p.patientId === 'pt-1041' || p.patientId === 'pt-1042'
    );
  }, [prescriptions, currentUser]);

  // Filter catalog
  const filteredCatalog = useMemo(() => {
    return DEMO_PHARMACY_CATALOG.filter((med) => {
      const matchesCat =
        selectedCategory === 'All Medicines' || med.category === selectedCategory;
      const matchesSearch =
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRx = !filterPrescriptionOnly || med.requiresPrescription;
      return matchesCat && matchesSearch && matchesRx;
    });
  }, [selectedCategory, searchQuery, filterPrescriptionOnly]);

  // Cart operations
  const addToCart = (med, quantity = 1, prescriptionNumber = '') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.medicineId === med.id);
      if (existing) {
        return prev.map((item) =>
          item.medicineId === med.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          medicineId: med.id,
          name: med.name,
          strength: med.strength,
          price: med.price,
          mrp: med.mrp,
          packSize: med.packSize,
          requiresPrescription: med.requiresPrescription,
          quantity,
          image: med.image,
          prescriptionNumber: prescriptionNumber || (med.requiresPrescription ? 'RX-2026-8812' : '')
        }
      ];
    });
    showToast(`Added "${med.name}" to pharmacy cart.`, 'success');
  };

  const updateQuantity = (medicineId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.medicineId === medicineId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (medicineId) => {
    setCart((prev) => prev.filter((item) => item.medicineId !== medicineId));
  };

  // Add all medicines from a prescription
  const handleAddPrescriptionToCart = (rx) => {
    let addedCount = 0;
    (rx.medicines || []).forEach((m) => {
      // Find match in catalog or construct on the fly
      const matched = DEMO_PHARMACY_CATALOG.find(
        (c) =>
          c.name.toLowerCase().includes(m.name.toLowerCase().split(' ')[0]) ||
          m.name.toLowerCase().includes(c.genericName.toLowerCase().split(' ')[0])
      );
      if (matched) {
        addToCart(matched, 1, rx.prescriptionNumber);
        addedCount++;
      } else {
        // Add as custom prescription item
        setCart((prev) => [
          ...prev,
          {
            medicineId: `rx-med-${Date.now()}-${Math.random()}`,
            name: m.name,
            strength: m.dosage || 'Prescribed dose',
            price: 120,
            mrp: 140,
            packSize: `${m.duration || '5 days'} course`,
            requiresPrescription: true,
            quantity: 1,
            prescriptionNumber: rx.prescriptionNumber
          }
        ]);
        addedCount++;
      }
    });
    showToast(`Added ${addedCount} prescribed medicines to cart from ${rx.prescriptionNumber}!`, 'success');
    setIsCartOpen(true);
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartSavings = cart.reduce((sum, item) => sum + ((item.mrp || item.price) - item.price) * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'Clinic Pickup' ? 0 : deliveryMethod === 'Express 2-Hour Delivery' ? 49 : 25;
  const cartTotal = cartSubtotal + deliveryFee;
  const hasPrescriptionItems = cart.some((item) => item.requiresPrescription);

  // Handle Checkout submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmittingOrder(true);

    setTimeout(() => {
      const order = createMedicineOrder({
        patientId: currentUser?.id || 'pt-1041',
        patientName: currentUser?.name || 'Aarav Patel',
        patientPhone: currentUser?.phone || '+91 98765 43210',
        deliveryAddress: deliveryMethod === 'Clinic Pickup' ? `${activeClinic?.name} Pharmacy Counter` : deliveryAddress,
        deliveryMethod,
        items: cart,
        subtotal: cartSubtotal,
        deliveryFee,
        discount: cartSavings,
        total: cartTotal,
        paymentMethod,
        paymentStatus: 'Paid',
        orderStatus: 'Order Placed',
        prescriptionAttached: hasPrescriptionItems ? 'RX-2026-8812 (Verified Doctor Digital Rx)' : undefined,
        clinicId: activeClinic?.id || 'clinic-citycare',
        clinicName: activeClinic?.name || 'CityCare Family Clinic Pharmacy'
      });

      setCart([]);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
      setIsSubmittingOrder(false);
      setCompletedOrder(order);
      setActiveTab('orders');
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-900/60 uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingBag className="w-3 h-3 text-teal-600" />
              Verified Clinic Pharmacy
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine Healthcare Stock
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Purchase Medicines & Pharmacy Store
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Order your doctor-prescribed medications with 1-click prescription fulfillment, or browse certified wellness products.
          </p>
        </div>

        {/* View Cart Button */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsCartOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pharmacy Cart ({cart.reduce((n, i) => n + i.quantity, 0)})</span>
            {cart.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[10px]">
                ₹{cartSubtotal}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'catalog'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>Browse Medicine Store ({DEMO_PHARMACY_CATALOG.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'prescriptions'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Order From Prescriptions ({myPrescriptions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>My Orders & Delivery Tracking ({medicineOrders.length})</span>
        </button>
      </div>

      {/* 1. TAB: BROWSE CATALOG */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* Quick Prescription Shortcut Bar */}
          {myPrescriptions.length > 0 && (
            <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-[#172640] border border-teal-200 dark:border-[#263B59] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-[#F1F5F9] text-sm">
                      Have an active digital prescription?
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      1-Click Fulfillment
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-[#CBD5E1] mt-0.5">
                    Order your prescribed medicines directly from Rx #{myPrescriptions[0].prescriptionNumber} (Dr. {myPrescriptions[0].doctorName}).
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAddPrescriptionToCart(myPrescriptions[0])}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shrink-0 shadow-sm flex items-center gap-1.5"
              >
                <span>Add Prescribed Medicines to Cart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand name, generic salt, or condition..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-[#94A3B8] dark:hover:text-white text-xs cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-[#CBD5E1] select-none">
              <input
                type="checkbox"
                checked={filterPrescriptionOnly}
                onChange={(e) => setFilterPrescriptionOnly(e.target.checked)}
                className="rounded border-slate-300 dark:border-[#263B59] text-teal-600 focus:ring-teal-500 bg-white dark:bg-[#0B1628]"
              />
              <span>Show Prescription Drugs Only (Rx)</span>
            </label>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {PHARMACY_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-[#172640] text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-50 dark:hover:bg-[#1C2D4B] border border-slate-200 dark:border-[#263B59]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Medicines Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCatalog.map((med) => {
              const inCartItem = cart.find((i) => i.medicineId === med.id);
              return (
                <Card
                  key={med.id}
                  className="border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] flex flex-col justify-between overflow-hidden hover:border-teal-500 dark:hover:border-teal-400 transition-all shadow-2xs group text-slate-900 dark:text-[#F1F5F9]"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative aspect-16/10 bg-slate-100 dark:bg-[#0D1729] overflow-hidden">
                      <img
                        src={med.image}
                        alt={med.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                        {med.requiresPrescription ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                            Rx Required
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                            OTC Medicine
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-500 text-slate-950 shadow-xs">
                          {med.discountPercent}% OFF
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider text-[10px]">
                          {med.form} · {med.strength}
                        </span>
                        <span className="font-mono">★ {med.rating}</span>
                      </div>

                      <h3
                        onClick={() => setSelectedMedicineForDetail(med)}
                        className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-blue-600 cursor-pointer"
                      >
                        {med.name}
                      </h3>

                      <p className="text-[11px] text-slate-500 font-mono line-clamp-1">
                        {med.genericName}
                      </p>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed pt-0.5">
                        {med.description}
                      </p>

                      <div className="pt-1 text-[11px] text-slate-500">
                        <span>Pack: </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{med.packSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Add Button Footer */}
                  <div className="p-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850/40">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-slate-900 dark:text-white">
                          ₹{med.price}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{med.mrp}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                        In Stock ({med.stockCount})
                      </span>
                    </div>

                    {inCartItem ? (
                      <div className="flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-800 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(med.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 shadow-2xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs px-1 text-teal-800 dark:text-teal-300">
                          {inCartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(med.id, 1)}
                          className="w-6 h-6 rounded-lg bg-teal-600 flex items-center justify-center text-white hover:bg-teal-700 shadow-2xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => addToCart(med, 1)}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredCatalog.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <Pill className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No medicines match your filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for another brand name or generic compound, or clear the category filters.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Medicines');
                  setFilterPrescriptionOnly(false);
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* 2. TAB: ORDER FROM ACTIVE PRESCRIPTIONS */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-950 dark:text-blue-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Authenticated Doctor Digital Prescriptions</p>
              <p className="text-xs text-blue-800 dark:text-blue-300 mt-0.5">
                Each prescription has been electronically authorized by your licensed specialist. Ordering here links the approved clinical diagnosis, dosage duration, and tamper-proof verification directly to the pharmacy team.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {myPrescriptions.map((rx) => (
              <Card
                key={rx.id}
                className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5"
              >
                <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-blue-600 dark:text-blue-400">
                      Prescription #{rx.prescriptionNumber}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {rx.doctorName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Consultation Date: {rx.date} · {rx.diagnosis || 'Clinical evaluation completed'}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Verified Digital Rx
                  </span>
                </div>

                {/* Prescribed Items List */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Prescribed Medicines Schedule ({rx.medicines?.length || 0})
                  </span>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                    {(rx.medicines || []).map((m, idx) => (
                      <div key={idx} className="p-3 bg-slate-50/50 dark:bg-slate-850/50 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">
                            {m.name}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {m.dosage} · {m.frequency || 'Twice Daily'} · {m.duration || '5 Days'}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                          {m.instructions || 'After meals'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Button */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Clinic pharmacy fulfills full course in 2 hours
                  </span>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleAddPrescriptionToCart(rx)}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Purchase All Prescribed Medicines →</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 3. TAB: ORDER HISTORY & TRACKING */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {completedOrder && (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 flex items-start gap-3 shadow-xs">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                  Order Successfully Placed!
                </span>
                <p className="text-sm font-bold text-emerald-900 dark:text-white">
                  Order #{completedOrder.orderNumber} is being prepared by the clinic pharmacist.
                </p>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Total Paid: ₹{completedOrder.total} via {completedOrder.paymentMethod} · Delivery method: {completedOrder.deliveryMethod}.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {medicineOrders.map((ord) => (
              <Card
                key={ord.id}
                className="p-5 sm:p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-extrabold text-blue-600 dark:text-blue-400">
                        {ord.orderNumber}
                      </span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-500">
                        {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Dispensed by: <span className="font-semibold">{ord.clinicName}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                          : ord.orderStatus === 'Out for Delivery'
                          ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300'
                          : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300'
                      }`}
                    >
                      {ord.orderStatus}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      ₹{ord.total}
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Ordered Medicines
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ord.items.map((it, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-xs flex justify-between items-center"
                      >
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200 block truncate max-w-[180px]">
                            {it.name}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            Qty: {it.quantity} · {it.strength}
                          </span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">
                          ₹{it.price * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery & Prescription metadata */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    <span>{ord.deliveryMethod} — {ord.deliveryAddress}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>Payment: <strong className="text-slate-700 dark:text-slate-300">{ord.paymentMethod} ({ord.paymentStatus})</strong></span>
                    {ord.prescriptionAttached && (
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        ✓ Rx Verified
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* CART SLIDE-OVER DRAWER MODAL */}
      <Modal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        title={`Pharmacy Cart (${cart.reduce((n, i) => n + i.quantity, 0)} Items)`}
        size="lg"
      >
        <div className="space-y-5 text-xs">
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-base font-bold text-slate-700 dark:text-slate-300">Your pharmacy cart is empty</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Add prescribed medications or certified healthcare products from our pharmacy catalog.
              </p>
              <Button variant="primary" size="sm" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Prescription verification notice */}
              {hasPrescriptionItems && (
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Prescription verification linked:</span>
                    <p className="text-[11px] text-blue-800 dark:text-blue-300">
                      Your registered digital prescription (RX-2026-8812) will be auto-attached for pharmacist sign-off before dispatch.
                    </p>
                  </div>
                </div>
              )}

              {/* Cart Items List */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto pr-1 space-y-2">
                {cart.map((item) => (
                  <div key={item.medicineId} className="pt-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 shrink-0">
                        <Pill className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-xs block">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {item.strength} · ₹{item.price} each
                        </span>
                        {item.requiresPrescription && (
                          <span className="inline-block text-[9px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-1.5 py-0.2 rounded mt-0.5">
                            Rx Required
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Qty controller */}
                      <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.medicineId, -1)}
                          className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-100 text-slate-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold font-mono px-1.5 text-xs text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.medicineId, 1)}
                          className="w-5 h-5 rounded flex items-center justify-center bg-teal-600 text-white hover:bg-teal-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-slate-900 dark:text-white font-mono w-14 text-right">
                        ₹{item.price * item.quantity}
                      </span>

                      <button
                        onClick={() => removeFromCart(item.medicineId)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-xl bg-[#0D1729] border border-[#263B59] space-y-2 text-xs">
                <div className="flex justify-between text-[#CBD5E1]">
                  <span>Items Subtotal:</span>
                  <span className="font-mono font-semibold">₹{cartSubtotal}</span>
                </div>
                {cartSavings > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Pharmacy Discount Savings:</span>
                    <span className="font-mono font-bold">-₹{cartSavings}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#CBD5E1]">
                  <span>Estimated Delivery Fee:</span>
                  <span className="font-mono font-semibold">
                    {deliveryFee === 0 ? 'FREE (Clinic Pickup)' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#263B59] flex justify-between text-sm font-extrabold text-[#F1F5F9]">
                  <span>Total Payable:</span>
                  <span className="font-mono text-teal-400">₹{cartTotal}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => setIsCartOpen(false)}>
                  Continue Browsing
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 flex items-center gap-1.5"
                >
                  <span>Proceed to Delivery & Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* CHECKOUT MODAL */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title="Delivery Address & Payment"
        size="md"
      >
        <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
          {/* Delivery Method Selection */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
              Select Delivery Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'Standard Delivery', fee: '₹25', time: 'Tomorrow, 6 PM' },
                { id: 'Express 2-Hour Delivery', fee: '₹49', time: 'Within 2 Hours' },
                { id: 'Clinic Pickup', fee: 'FREE', time: 'Immediate Ready' }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setDeliveryMethod(opt.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    deliveryMethod === opt.id
                      ? 'border-teal-400 bg-teal-950/70 ring-1 ring-teal-400'
                      : 'border-[#263B59] bg-[#172640] hover:bg-[#1C2D4B]'
                  }`}
                >
                  <span className="font-bold text-[#F1F5F9] block text-xs">{opt.id}</span>
                  <span className="text-[10px] text-teal-400 font-bold block">{opt.fee}</span>
                  <span className="text-[10px] text-[#94A3B8] block">{opt.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          {deliveryMethod !== 'Clinic Pickup' && (
            <div className="space-y-1.5">
              <label className="block font-bold text-[#CBD5E1] uppercase tracking-wider text-[11px]">
                Delivery Street Address
              </label>
              <textarea
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#263B59] bg-[#0B1628] text-[#F1F5F9] text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none placeholder-[#94A3B8]"
              />
            </div>
          )}

          {/* Payment Method */}
          <div className="space-y-1.5">
            <label className="block font-bold text-[#CBD5E1] uppercase tracking-wider text-[11px]">
              Payment Options
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['UPI', 'Credit/Debit Card', 'NetBanking', 'Cash on Delivery'].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`p-2.5 rounded-xl border text-left font-semibold transition-all cursor-pointer ${
                    paymentMethod === m
                      ? 'border-blue-400 bg-blue-950/70 text-blue-300'
                      : 'border-[#263B59] bg-[#172640] text-[#CBD5E1]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Order Total Review */}
          <div className="p-3.5 rounded-xl bg-[#0D1729] border border-[#263B59] space-y-1">
            <div className="flex justify-between font-bold text-[#F1F5F9] text-xs">
              <span>Final Amount to Pay:</span>
              <span className="font-mono text-base text-teal-400">₹{cartTotal}</span>
            </div>
            <span className="text-[10px] text-[#94A3B8] block">
              Includes 5% Goods & Services Tax (GST) and licensed batch certification.
            </span>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmittingOrder}
            variant="primary"
            size="md"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-3 shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmittingOrder ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Order & Pharmacy Receipt...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Purchase & Pay ₹{cartTotal}</span>
              </>
            )}
          </Button>
        </form>
      </Modal>

      {/* MEDICINE DETAIL MODAL */}
      {selectedMedicineForDetail && (
        <Modal
          isOpen={!!selectedMedicineForDetail}
          onClose={() => setSelectedMedicineForDetail(null)}
          title={selectedMedicineForDetail.name}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-4">
              <img
                src={selectedMedicineForDetail.image}
                alt={selectedMedicineForDetail.name}
                className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">
                  {selectedMedicineForDetail.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedMedicineForDetail.name}
                </h3>
                <p className="text-slate-500 font-mono text-[11px]">
                  {selectedMedicineForDetail.genericName}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                    ₹{selectedMedicineForDetail.price}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{selectedMedicineForDetail.mrp}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                    {selectedMedicineForDetail.discountPercent}% OFF
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#172640] border border-[#263B59] space-y-1.5">
              <span className="font-bold text-[#CBD5E1] uppercase tracking-wider text-[10px] block">
                Active Composition & Strength
              </span>
              <p className="font-mono text-[#F1F5F9] font-semibold">
                {selectedMedicineForDetail.activeComposition}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-[#CBD5E1] uppercase tracking-wider text-[10px] block">
                Clinical Indication & Uses
              </span>
              <p className="text-[#CBD5E1] leading-relaxed">
                {selectedMedicineForDetail.description}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-[#CBD5E1] uppercase tracking-wider text-[10px] block">
                Dosage & Administration Protocol
              </span>
              <p className="text-[#CBD5E1] leading-relaxed bg-[#172640] p-3 rounded-xl border border-[#263B59]">
                {selectedMedicineForDetail.dosageInstructions}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[#94A3B8] font-mono text-[11px]">
                Manufactured by {selectedMedicineForDetail.manufacturer}
              </span>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  addToCart(selectedMedicineForDetail, 1);
                  setSelectedMedicineForDetail(null);
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold"
              >
                Add to Cart (₹{selectedMedicineForDetail.price})
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
