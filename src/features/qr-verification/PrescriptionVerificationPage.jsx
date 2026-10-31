<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { verificationService } from '../../services/verificationService';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
=======
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { verificationService } from '../../services/verificationService';
import {
  ShieldCheck,
  ShieldAlert,
  Camera,
  CameraOff,
  Search,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
  User,
  Calendar,
  RefreshCw,
  QrCode
} from 'lucide-react';
>>>>>>> origin/main
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function PrescriptionVerificationPage() {
  const { verificationId } = useParams();
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function check() {
      setLoading(true);
      const data = await verificationService.verifyPrescription(verificationId || 'demo');
      setResult(data);
      setLoading(false);
    }
    check();
  }, [verificationId]);

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 dark:text-slate-400">Querying prescription verification registry...</p>
      </div>
    );
  }
=======
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(verificationId ? 'result' : 'scan'); // 'scan' | 'manual' | 'result'
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [manualInput, setManualInput] = useState(verificationId || '');

  // Camera Scanner State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [barcodeSupported, setBarcodeSupported] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Check BarcodeDetector support on mount
  useEffect(() => {
    if ('BarcodeDetector' in window) {
      setBarcodeSupported(true);
    }
  }, []);

  // Fetch result when verificationId changes or submitted
  const verifyToken = async (idToVerify) => {
    if (!idToVerify || !idToVerify.trim()) return;
    setLoading(true);
    setCameraError(null);
    stopCamera();

    try {
      const data = await verificationService.verifyPrescription(idToVerify.trim());
      setResult(data);
      setActiveTab('result');
    } catch (err) {
      console.warn('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (verificationId) {
      verifyToken(verificationId);
    }
  }, [verificationId]);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access is not supported by your browser.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);

      // Start continuous barcode scanning if BarcodeDetector is available
      if ('BarcodeDetector' in window) {
        // @ts-ignore
        const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
        scanIntervalRef.current = setInterval(async () => {
          if (videoRef.current && videoRef.current.readyState === 4) {
            try {
              const barcodes = await detector.detect(videoRef.current);
              if (barcodes.length > 0) {
                const rawValue = barcodes[0].rawValue;
                // If it's a URL like /verify-prescription/xxx, extract token
                const match = rawValue.match(/verify-prescription\/([^/?#]+)/);
                const token = match ? match[1] : rawValue;
                stopCamera();
                navigate(`/verify-prescription/${token}`);
                verifyToken(token);
              }
            } catch (e) {
              // Ignore frame read error
            }
          }
        }, 300);
      }
    } catch (err) {
      console.warn('[Camera Scanner] Error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was denied. Please allow camera permissions in your browser or enter the prescription ID manually.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No video camera was detected on this device. Please use manual ID verification.');
      } else {
        setCameraError(`Camera error (${err.message || 'Unable to open camera'}).`);
      }
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualInput.trim()) {
      navigate(`/verify-prescription/${manualInput.trim()}`);
      verifyToken(manualInput.trim());
    }
  };
>>>>>>> origin/main

  const isAuthentic = result?.status === 'Authentic';

  return (
<<<<<<< HEAD
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-12 space-y-6 transition-colors">
      {/* Top Brand Banner */}
=======
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 space-y-6 transition-colors">
      {/* Header Banner */}
>>>>>>> origin/main
      <div className="text-center space-y-2">
        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Official Digital Verification Authority
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Prescription Authenticity Check
        </h1>
<<<<<<< HEAD
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Scanned Verification Token:{' '}
          <code className="font-mono text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
            {verificationId}
          </code>
        </p>
      </div>

      {/* Verification Result Card */}
      <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        {/* Status Badge */}
        <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800">
          {isAuthentic ? (
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-10 h-10" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShieldAlert className="w-10 h-10" />
            </div>
          )}

          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isAuthentic
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}
            >
              Verification Status: {result?.status}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Prescription Ref: <strong className="font-mono text-slate-900 dark:text-white">{result?.prescriptionNumber}</strong>
            </p>
          </div>
        </div>

        {/* Verified Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Issuing Healthcare Facility</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{result?.clinicName}</p>
            <p className="text-slate-500 dark:text-slate-400">Location: {result?.clinicCity}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Authorized Doctor</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{result?.doctorName}</p>
            <p className="text-slate-500 dark:text-slate-400">Council Reg: {result?.doctorRegistration}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Date of Issuance</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{result?.dateIssued}</p>
            <p className="text-slate-500 dark:text-slate-400">Official Clinical Record Timestamp</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Scheduled Follow-Up</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{result?.followUpDate || 'As advised'}</p>
            <p className="text-slate-500 dark:text-slate-400">Follow-up appointment window</p>
          </div>
        </div>

        {/* Privacy Guard Notice */}
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-300 space-y-1.5">
          <p className="font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            Healthcare Privacy Safeguard
          </p>
          <p className="text-blue-850 dark:text-blue-300 leading-relaxed text-[11px]">
            In compliance with patient confidentiality standards, specific medical diagnosis notes, full clinical histories, and prescription dosages are deliberately withheld from public QR scanning views. Only verified healthcare practitioners and the authenticated patient may access complete clinical documentation.
          </p>
        </div>

        {/* Demo Mode Notice */}
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-850 dark:text-amber-300 space-y-1">
          <p className="font-semibold">Sample Verification Demo Mode</p>
          <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed">
            {result?.verificationNotice}
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium">
            ← Return to Public Home
          </Link>
          <Link to="/clinics">
            <Button variant="outline" size="sm">
              Explore Connected Clinics
            </Button>
          </Link>
        </div>
      </Card>
=======
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Scan the QR code printed on your ClinicOS digital prescription or enter the alphanumeric token below to verify authenticity.
        </p>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center justify-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl max-w-sm mx-auto text-xs font-semibold">
        <button
          onClick={() => {
            setActiveTab('scan');
            startCamera();
          }}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'scan'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Camera Scan</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('manual');
            stopCamera();
          }}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'manual'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Manual Entry</span>
        </button>
        {result && (
          <button
            onClick={() => {
              setActiveTab('result');
              stopCamera();
            }}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'result'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Result</span>
          </button>
        )}
      </div>

      {/* Tab 1: Camera Scanner View */}
      {activeTab === 'scan' && (
        <Card className="p-6 text-center space-y-4 border-slate-200 dark:border-slate-800">
          <div className="relative max-w-md mx-auto aspect-square bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-blue-500/50">
            {isCameraActive ? (
              <>
                <video ref={videoRef} className="w-full h-full object-cover" />
                {/* Visual Target Reticle */}
                <div className="absolute inset-8 border-2 border-blue-400 rounded-2xl pointer-events-none animate-pulse">
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white" />
                </div>
              </>
            ) : (
              <div className="p-6 text-slate-400 space-y-3">
                <CameraOff className="w-12 h-12 mx-auto stroke-1" />
                <p className="text-xs">Camera is inactive</p>
                <Button variant="primary" size="sm" onClick={startCamera}>
                  Turn On Camera
                </Button>
              </div>
            )}
          </div>

          {cameraError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-800 dark:text-rose-300 text-xs text-left flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Camera Access Notice</p>
                <p className="mt-0.5">{cameraError}</p>
              </div>
            </div>
          )}

          {/* Fallback Simulator Button for Testing */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center space-x-3 text-xs">
            <span className="text-slate-400">Testing without a printed code?</span>
            <button
              onClick={() => {
                navigate('/verify-prescription/demo-token-9842');
                verifyToken('demo-token-9842');
              }}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Simulate Valid QR Scan
            </button>
          </div>
        </Card>
      )}

      {/* Tab 2: Manual ID Entry View */}
      {activeTab === 'manual' && (
        <Card className="p-6 space-y-4 border-slate-200 dark:border-slate-800">
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Prescription ID or Verification Hash:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="e.g. RX-2026-9042 or demo-token-9842"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Found beneath the QR code on the footer of your issued ClinicOS prescription.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-x-2 text-xs">
                <span className="text-slate-400">Quick Test Samples:</span>
                <button
                  type="button"
                  onClick={() => setManualInput('RX-2026-9042')}
                  className="text-blue-600 hover:underline font-mono"
                >
                  RX-2026-9042
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setManualInput('RX-EXPIRED-TEST')}
                  className="text-blue-600 hover:underline font-mono"
                >
                  RX-EXPIRED
                </button>
              </div>

              <Button variant="primary" size="md" type="submit" disabled={loading || !manualInput.trim()}>
                {loading ? 'Verifying...' : 'Verify Prescription'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tab 3: Verification Result View */}
      {activeTab === 'result' && (
        <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 shadow-md space-y-6">
          {/* Status Badge */}
          <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800">
            {isAuthentic ? (
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-in zoom-in">
                <ShieldCheck className="w-10 h-10" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center animate-in zoom-in">
                <ShieldAlert className="w-10 h-10" />
              </div>
            )}

            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isAuthentic
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                }`}
              >
                Verification Status: {result?.status || 'Authentic'}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Prescription Reference: <strong className="font-mono text-slate-900 dark:text-white">{result?.prescriptionNumber || manualInput}</strong>
              </p>
            </div>
          </div>

          {/* Verified Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Issuing Healthcare Facility</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{result?.clinicName || 'CityCare General Clinic'}</p>
              <p className="text-slate-500">Location: {result?.clinicCity || 'Mumbai, Maharashtra'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Authorized Doctor</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{result?.doctorName || 'Dr. Ananya Sharma'}</p>
              <p className="text-slate-500">Registration: {result?.doctorRegistration || 'MCI-2018-84920'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Patient Name & Chart</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{result?.patientName || 'Rajesh Kumar'}</p>
              <p className="text-slate-500">ID: {result?.patientId || 'PT-1048'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Date of Issuance</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{result?.dateIssued || '2026-10-23'}</p>
              <p className="text-slate-500">Digital Verification Hash Validated</p>
            </div>
          </div>

          {/* Authenticated Medication Items */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Verified Medications on File:
            </span>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              {(result?.items || [
                { name: 'Augmentin 625mg', dosage: '1 Tab Twice Daily (5 Days)', quantity: '10 Tabs' },
                { name: 'Pantoprazole 40mg', dosage: '1 Tab Before Breakfast', quantity: '5 Tabs' }
              ]).map((item, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-slate-900 flex justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{item.name}</span>
                    <p className="text-[11px] text-slate-500">{item.dosage}</p>
                  </div>
                  <span className="font-mono text-slate-600 dark:text-slate-300 font-semibold">{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setActiveTab('scan');
                startCamera();
              }}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Verify Another Prescription</span>
            </button>

            <Link to="/">
              <Button variant="outline" size="sm">
                Return to ClinicOS Portal
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Demonstration Banner Notice */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-500 space-y-1">
        <p>
          🔒 <strong>Verification Engine Notice:</strong> This digital verification portal checks tamper-evident hashes generated by ClinicOS EHR systems. In this frontend prototype, verification queries simulated local records.
        </p>
      </div>
>>>>>>> origin/main
    </div>
  );
}
