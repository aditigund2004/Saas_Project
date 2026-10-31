import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, Clock, User, Phone, Mail, CheckCircle2, 
  Building2, Stethoscope, ArrowRight, ShieldCheck, 
  MessageSquare, AlertCircle, Video, MapPin, ChevronLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function BookDoctorPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { 
    doctors, 
    clinics, 
    currentUser, 
    submitBookingRequest, 
    getAvailableSlotsForDoctor,
    showToast,
    openWhatsAppModal
  } = useApp();

  const [step, setStep] = useState(1);
  const [consultationType, setConsultationType] = useState('In-Person'); // 'Video' or 'In-Person'
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState(currentUser?.name || '');
  const [patientPhone, setPatientPhone] = useState(currentUser?.phone || '');
  const [patientEmail, setPatientEmail] = useState(currentUser?.email || '');
  const [notes, setNotes] = useState('');
  const [bookedAppointment, setBookedAppointment] = useState(null);

  const doctor = useMemo(() => doctors.find(d => d.id === doctorId), [doctors, doctorId]);
  const clinic = useMemo(() => doctor ? clinics.find(c => c.id === doctor.clinicId) : null, [doctor, clinics]);
  
  const availableSlots = useMemo(() => {
    if (!doctor || !selectedDate) return [];
    return getAvailableSlotsForDoctor(doctor.clinicId, doctor.id, selectedDate);
  }, [doctor, selectedDate, getAvailableSlotsForDoctor]);

  useEffect(() => {
    if (!doctor) {
      showToast('Doctor not found', 'error');
      navigate('/clinics');
    }
  }, [doctor, navigate, showToast]);

  if (!doctor || !clinic) return null;

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedTime) {
      showToast('Please select a time slot', 'error');
      return;
    }

    const bookingData = {
      clinicId: clinic.id,
      doctorId: doctor.id,
      patientId: currentUser?.id || `guest-${Date.now()}`,
      patientName,
      patientPhone,
      patientEmail,
      date: selectedDate,
      time: selectedTime,
      consultationType: `${consultationType} Consultation`,
      serviceName: consultationType === 'Video' ? 'Online Consultation' : 'In-Clinic Visit',
      notes
    };

    const result = submitBookingRequest(bookingData);
    if (result) {
      setBookedAppointment(result);
      setStep(4);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
        <ArrowRight className="w-3 h-3" />
        <Link to="/clinics" className="hover:text-blue-600 dark:hover:text-blue-400">Find Doctor</Link>
        <ArrowRight className="w-3 h-3" />
        <span className="text-slate-900 dark:text-[#F1F5F9]">Book {doctor.name}</span>

      </nav>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[
          { n: 1, l: 'Format' },
          { n: 2, l: 'Schedule' },
          { n: 3, l: 'Details' }
        ].map((s) => (
          <div key={s.n} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= s.n ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-[#172640] text-slate-500 dark:text-[#94A3B8]'
            }`}>
              {s.n}
            </div>
            <span className={`text-xs font-bold ${step >= s.n ? 'text-slate-900 dark:text-[#F1F5F9]' : 'text-slate-400 dark:text-[#94A3B8]'}`}>
              {s.l}
            </span>
            {s.n < 3 && <div className="w-8 h-px bg-slate-200 dark:bg-[#263B59]" />}

          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Doctor Summary (Right on Desktop, Top on Mobile) */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <Card className="p-5 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] sticky top-24 space-y-4 shadow-xs">
            <div className="flex gap-4">
              <img src={doctor.avatar} alt={doctor.name} className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-200 dark:ring-[#263B59]" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-[#F1F5F9]">{doctor.name}</h3>
                <p className="text-xs text-blue-600 dark:text-[#22D3EE] font-semibold">{doctor.specialty}</p>
                <div className="flex items-center gap-1 text-[10px] text-amber-500 dark:text-amber-400 font-bold mt-1">

                  <Star className="w-3 h-3 fill-current" />
                  <span>{doctor.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100 dark:border-[#263B59] space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <Building2 className="w-4 h-4 text-slate-400 dark:text-[#94A3B8]" />
                <span className="text-slate-700 dark:text-[#CBD5E1] font-medium">{clinic.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-slate-400 dark:text-[#94A3B8]" />
                <span className="text-slate-600 dark:text-[#94A3B8]">{clinic.locality}, {clinic.city}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-[#263B59]">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 dark:text-[#94A3B8] font-medium">Consultation Fee</span>
                <span className="text-sm font-bold text-slate-900 dark:text-[#F1F5F9]">₹{doctor.consultationFee}</span>

              </div>
            </div>
          </Card>
        </div>

        {/* Booking Steps (Left on Desktop) */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          {step === 1 && (
            <Card className="p-6 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] space-y-6 shadow-xs animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-900 dark:text-[#F1F5F9]">How would you like to consult?</h2>
                <p className="text-sm text-slate-500 dark:text-[#94A3B8]">Choose the most convenient format for you.</p>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  onClick={() => setConsultationType('In-Person')}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
                    consultationType === 'In-Person' ? 'border-blue-600 bg-blue-50/50 dark:bg-[#172640]' : 'border-slate-200 dark:border-[#263B59] hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    consultationType === 'In-Person' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-[#0D1729] text-slate-500 dark:text-[#94A3B8]'

                  }`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-[#F1F5F9]">In-Clinic Visit</h4>
                    <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-1">Visit the doctor at {clinic.name}</p>

                  </div>
                </div>

                <div 
                  onClick={() => setConsultationType('Video')}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
                    consultationType === 'Video' ? 'border-blue-600 bg-blue-50/50 dark:bg-[#172640]' : 'border-slate-200 dark:border-[#263B59] hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    consultationType === 'Video' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-[#0D1729] text-slate-500 dark:text-[#94A3B8]'

                  }`}>
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-[#F1F5F9]">Video Consultation</h4>
                    <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-1">Connect remotely via high-quality video call</p>

                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="primary" size="lg" onClick={() => setStep(2)}>
                  Continue to Schedule
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-6 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] space-y-6 shadow-xs animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-[#F1F5F9]">Select Date & Time</h2>
                  <p className="text-sm text-slate-500 dark:text-[#94A3B8]">Pick a slot that works for you.</p>

                </div>
                <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-slate-400">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider mb-3">

                    Available Dates
                  </label>
                  <input 
                    type="date" 
                    min={new Date().toISOString().slice(0, 10)}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime('');
                    }}
                    className="w-full sm:w-64 px-4 py-3 rounded-xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] text-sm focus:ring-2 focus:ring-blue-500 outline-none"

                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wider mb-3">
                    Select Time Slot
                  </label>
                  {availableSlots.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 dark:bg-[#0D1729] rounded-2xl border border-dashed border-slate-200 dark:border-[#263B59]">
                      <Clock className="w-8 h-8 text-slate-300 dark:text-[#94A3B8] mx-auto mb-2" />
                      <p className="text-sm text-slate-500 dark:text-[#94A3B8]">No slots available for this date.</p>

                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {availableSlots.map(slot => (
                        <button
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            !slot.available 
                              ? 'bg-slate-50 dark:bg-[#0D1729] text-slate-300 dark:text-slate-600 border-slate-100 dark:border-[#263B59] cursor-not-allowed'
                              : selectedTime === slot.time
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                                : 'bg-white dark:bg-[#0B1628] text-slate-700 dark:text-[#CBD5E1] border-slate-200 dark:border-[#263B59] hover:border-blue-400 hover:text-blue-600'

                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  variant="primary" 
                  size="lg" 
                  disabled={!selectedTime}
                  onClick={() => setStep(3)}
                >
                  Confirm Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card className="p-6 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] space-y-6 shadow-xs animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-[#F1F5F9]">Patient Details</h2>
                  <p className="text-sm text-slate-500 dark:text-[#94A3B8]">Provide contact information for the appointment.</p>

                </div>
                <Button variant="ghost" size="sm" onClick={() => setStep(2)} className="text-slate-400">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-[#CBD5E1]">Full Name *</label>

                    <input 
                      required
                      type="text" 
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-[#CBD5E1]">Mobile Number *</label>

                    <input 
                      required
                      type="tel" 
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-[#CBD5E1]">Email Address</label>

                    <input 
                      type="email" 
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-[#CBD5E1]">Symptoms / Message for Doctor</label>

                    <textarea 
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Optional: Briefly describe your concern..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] text-sm focus:ring-2 focus:ring-blue-500 outline-none"

                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-[#263B59]">
                  <div className="bg-slate-50 dark:bg-[#0D1729] rounded-2xl p-4 space-y-2 mb-6 border border-slate-200 dark:border-[#263B59]">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-[#94A3B8]">Consultation:</span>
                      <span className="font-bold text-slate-900 dark:text-[#F1F5F9]">{consultationType}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-[#94A3B8]">Date & Time:</span>
                      <span className="font-bold text-blue-600 dark:text-[#22D3EE]">{selectedDate} at {selectedTime}</span>

                    </div>
                  </div>
                  
                  <Button variant="primary" size="lg" className="w-full" type="submit">
                    Complete Booking
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {step === 4 && bookedAppointment && (
            <Card className="p-8 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] text-center space-y-6 shadow-xs animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">

                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900 dark:text-[#F1F5F9]">Booking Requested!</h2>
                <p className="text-sm text-slate-500 dark:text-[#94A3B8] max-w-sm mx-auto leading-relaxed">

                  Your request has been sent to <strong>{clinic.name}</strong>. You will receive a confirmation message once they verify the slot.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-[#0D1729] rounded-3xl p-6 max-w-sm mx-auto space-y-4 border border-slate-200 dark:border-[#263B59]">
                <div className="text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-[#94A3B8]">Ref Number:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-[#F1F5F9]">{bookedAppointment.referenceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-[#94A3B8]">Doctor:</span>
                    <span className="font-bold text-slate-900 dark:text-[#F1F5F9]">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-[#94A3B8]">Scheduled:</span>
                    <span className="font-bold text-blue-600 dark:text-[#22D3EE]">{selectedDate} at {selectedTime}</span>

                  </div>
                </div>

                <Button 
                  variant="whatsapp" 
                  size="sm" 
                  className="w-full"
                  onClick={() => openWhatsAppModal({
                    patient_name: patientName,
                    doctor_name: doctor.name,
                    clinic_name: clinic.name,
                    appointment_date: selectedDate,
                    appointment_time: selectedTime,
                    appointment_reference: bookedAppointment.referenceNumber
                  })}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Preview Confirmation
                </Button>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/patient/appointments">
                  <Button variant="outline" size="md" className="w-full sm:w-auto">
                    Track in Portal
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="ghost" size="md" className="w-full sm:w-auto">
                    Return Home
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
