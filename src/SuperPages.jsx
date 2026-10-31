import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  CreditCard,
  Download,
  FileText,
  Plus,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import {
  Mail,
  Send,
  Eye,
  Edit2,
  Trash2,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Smartphone,
  Monitor,
  Copy,
  RotateCcw,
  ToggleLeft,
  ToggleRight,
  Inbox,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Shield,
  Search,
  ArrowRight,
} from "lucide-react";
import { buildHtmlEmail, interpolatePlaceholders } from "./emails";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStore } from "./Store";
import {
  Badge,
  DataTable,
  Modal,
  PageHeading,
  Panel,
  PrimaryButton,
  StatCard,
} from "./components";
import { revenueData } from "./data";

export function SuperDashboard() {
  const { data } = useStore();
  const active = data.clinics.filter(
    (clinic) => clinic.status === "Active",
  ).length;
  const trial = data.clinics.filter(
    (clinic) => clinic.status === "Trial",
  ).length;
  const plans = data.plans.map((plan, index) => ({
    name: plan.name,
    value:
      data.clinics.filter((clinic) => clinic.plan === plan.name).length || 1,
    color: ["#3478f6", "#8b9cf6", "#47b88d"][index % 3],
  }));
  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Monday, October 26, 2026"
        title="Platform overview"
        description="Welcome back, Alex. Here’s how ClinicFlow is doing today."
        action={
          <button className="btn btn-secondary" onClick={() => window.print()}>
            <Download size={14} /> Export report
          </button>
        }
      />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total organizations"
          value={data.clinics.length + 126}
          change="+12.8%"
          icon={Building2}
          tone="blue"
          detail="+18 this month"
        />
        <StatCard
          label="Monthly recurring revenue"
          value="₹24,680"
          change="+8.4%"
          icon={Wallet}
          tone="green"
          detail="vs. last month"
        />
        <StatCard
          label="Active subscriptions"
          value={active + 118}
          change="+6.2%"
          icon={ShieldCheck}
          tone="purple"
          detail="94.8% retention rate"
        />
        <StatCard
          label="Trial organizations"
          value={trial + 12}
          icon={Activity}
          tone="orange"
          detail="8 trials ending this week"
        />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <Panel
          title="Revenue overview"
          subtitle="Monthly recurring revenue · INR (₹)"
          action={
            <select
              className="form-input !w-auto !py-1.5 !text-[11px]"
              aria-label="Revenue date range"
            >
              <option>Last 6 months</option>
              <option>This year</option>
            </select>
          }
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={revenueData}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="platformRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0" stopColor="#3478f6" stopOpacity={0.16} />
                  <stop offset="1" stopColor="#3478f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#eef2f7"
                strokeDasharray="4 5"
                vertical={false}
              />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <Tooltip
                formatter={(value) => `₹${Number(value).toLocaleString()}`}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3478f6"
                strokeWidth={2.5}
                fill="url(#platformRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
        <Panel
          title="Organizations by plan"
          subtitle="Current subscription mix"
        >
          <div className="flex justify-center">
            <div className="relative h-[190px] w-[220px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={plans}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={78}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {plans.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <b className="text-2xl text-slate-800">
                  {data.clinics.length + 126}
                </b>
                <span className="text-[10px] text-slate-400">
                  organizations
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {plans.map((plan) => (
              <div
                className="flex items-center gap-2 text-[11px] text-slate-500"
                key={plan.name}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: plan.color }}
                />
                {plan.name}
                <b className="ml-auto text-slate-700">{plan.value * 24}%</b>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel
          title="Recent organization registrations"
          subtitle="The latest clinics joining the platform"
          action={
            <a
              href="/super-admin/organizations"
              className="text-[11px] font-semibold text-blue-600"
            >
              All organizations →
            </a>
          }
        >
          <DataTable
            columns={[
              {
                key: "name",
                label: "Organization",
                render: (_, row) => (
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-bold text-blue-700">
                      {row.initials}
                    </span>
                    <div>
                      <b className="font-semibold text-slate-700">{row.name}</b>
                      <div className="text-[10px] text-slate-400">
                        {row.owner}
                      </div>
                    </div>
                  </div>
                ),
              },
              { key: "plan", label: "Plan" },
              {
                key: "status",
                label: "Status",
                render: (value) => <Badge>{value}</Badge>,
              },
            ]}
            rows={data.clinics.slice(-4).reverse()}
          />
        </Panel>
        <Panel
          title="Renewals & activity"
          subtitle="Keep an eye on what’s coming up"
        >
          <div className="space-y-3">
            {[
              {
                label: "CityCare Medical Center",
                caption: "Professional plan renews Nov 04",
                amount: "₹99.00",
                tone: "blue",
              },
              {
                label: "GreenLife Clinic",
                caption: "Trial ends in 11 days",
                amount: "Trial",
                tone: "purple",
              },
              {
                label: "Sunrise Family Clinic",
                caption: "Starter plan renews Nov 12",
                amount: "₹49.00",
                tone: "green",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-slate-100 p-3"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.tone === "green" ? "bg-emerald-50 text-emerald-600" : item.tone === "purple" ? "bg-violet-50 text-violet-600" : "bg-blue-50 text-blue-600"}`}
                >
                  <CalendarDays size={16} />
                </span>
                <div className="flex-1">
                  <b className="block text-xs text-slate-700">{item.label}</b>
                  <span className="text-[10px] text-slate-400">
                    {item.caption}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

export function OrganizationsPage() {
  const { data, addClinic, updateClinic, notify } = useStore();
  const availablePlans = data.plans.filter((plan) => !plan.archived);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name").trim();
    const clinic = {
      id: `clinic-${Date.now()}`,
      name,
      owner: form.get("owner"),
      email: form.get("email"),
      phone: form.get("phone"),
      address: form.get("address"),
      plan: form.get("plan"),
      status: "Trial",
      joined: new Date().toISOString().slice(0, 10),
      renewal: "2026-11-26",
      accent: "#edf2ff",
      initials: name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      patients: [],
      staff: [],
      appointments: [],
      services: [],
    };
    addClinic(clinic);
    setOpen(false);
    notify("Organization created successfully");
  }
  const rows = data.clinics.map((clinic) => ({
    ...clinic,
    organization: (
      <button
        className="flex items-center gap-2.5 text-left"
        onClick={() => navigate(`/super-admin/organizations/${clinic.id}`)}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-bold text-blue-700">
          {clinic.initials}
        </span>
        <span>
          <b className="block text-xs font-semibold text-slate-700">
            {clinic.name}
          </b>
          <span className="text-[10px] text-slate-400">{clinic.email}</span>
        </span>
      </button>
    ),
    status: <Badge>{clinic.status}</Badge>,
    actions: (
      <button
        className={`text-[10px] font-semibold ${clinic.status === "Suspended" ? "text-emerald-600" : "text-rose-500"}`}
        onClick={() => {
          updateClinic(clinic.id, {
            status: clinic.status === "Suspended" ? "Active" : "Suspended",
          });
          notify(
            clinic.status === "Suspended"
              ? "Organization reactivated"
              : "Organization suspended",
          );
        }}
      >
        {clinic.status === "Suspended" ? "Reactivate" : "Suspend"}
      </button>
    ),
  }));
  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Tenant directory"
        title="Organizations"
        description="Manage clinic tenants, subscriptions, and account health across the platform."
        action={
          <PrimaryButton onClick={() => setOpen(true)}>
            Add organization
          </PrimaryButton>
        }
      />
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="All organizations"
          value={data.clinics.length + 126}
          change="+12.8%"
          icon={Building2}
          tone="blue"
        />
        <StatCard
          label="Active organizations"
          value={
            data.clinics.filter((clinic) => clinic.status === "Active").length +
            118
          }
          icon={ShieldCheck}
          tone="green"
        />
        <StatCard
          label="In free trial"
          value={
            data.clinics.filter((clinic) => clinic.status === "Trial").length +
            12
          }
          icon={Activity}
          tone="orange"
        />
      </div>
      <Panel
        title="All organizations"
        subtitle="Search and manage platform tenants"
      >
        <DataTable
          columns={[
            { key: "organization", label: "Organization" },
            { key: "owner", label: "Primary admin" },
            { key: "plan", label: "Plan" },
            { key: "joined", label: "Registration date" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Actions" },
          ]}
          rows={rows}
          searchPlaceholder="Search organizations..."
        />
      </Panel>
      {open && (
        <Modal title="Create organization" onClose={() => setOpen(false)}>
          <form className="space-y-4" onSubmit={submit}>
            <Field
              label="Organization name"
              name="name"
              placeholder="e.g. Harbor Health Clinic"
              required
            />
            <Field
              label="Owner / primary admin"
              name="owner"
              placeholder="Dr. Alex Morgan"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="owner@clinic.com"
                required
              />
              <Field
                label="Phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <Field
              label="Address"
              name="address"
              placeholder="Street, city, state"
            />
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-medium text-slate-600">
                Subscription plan
              </span>
              <select className="form-input !text-xs" name="plan">
                {availablePlans.map((plan) => (
                  <option key={plan.id}>{plan.name}</option>
                ))}
              </select>
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <PrimaryButton type="submit" icon={null}>
                Create organization
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export function OrganizationDetailPage() {
  const { organizationId } = useParams();
  const { data, updateClinic } = useStore();
  const clinic = data.clinics.find((item) => item.id === organizationId);
  const [tab, setTab] = useState("Overview");
  if (!clinic)
    return (
      <div className="content-wrap">
        <PageHeading title="Organization not found" />
        <a className="text-sm text-blue-600" href="/super-admin/organizations">
          Back to organizations
        </a>
      </div>
    );
  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Tenant profile"
        title={clinic.name}
        description={`Organization account · ${clinic.id}`}
        action={<Badge>{clinic.status}</Badge>}
      />
      <div className="mb-5 flex gap-2 overflow-x-auto border-b border-slate-200">
        {[
          "Overview",
          "Subscription",
          "Billing history",
          "Clinic information",
          "Activity log",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-xs ${tab === item ? "border-blue-600 font-semibold text-blue-700" : "border-transparent text-slate-500"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Panel title={tab} subtitle={`${clinic.name} · ${tab.toLowerCase()}`}>
          {tab === "Overview" && (
            <>
              <Detail label="Organization owner" value={clinic.owner} />
              <Detail label="Email" value={clinic.email} />
              <Detail label="Phone" value={clinic.phone} />
              <Detail label="Joined" value={clinic.joined} />
              <Detail label="Patients" value={clinic.patients.length} />
              <Detail label="Team members" value={clinic.staff.length} />
            </>
          )}
          {tab === "Subscription" && (
            <>
              <Detail label="Current plan" value={clinic.plan} />
              <Detail label="Status" value={clinic.status} />
              <Detail label="Next renewal" value={clinic.renewal} />
              <label className="mt-4 block">
                <span className="mb-1.5 block text-[11px] font-medium text-slate-600">
                  Change plan
                </span>
                <select
                  className="form-input !text-xs"
                  value={clinic.plan}
                  onChange={(event) =>
                    updateClinic(clinic.id, { plan: event.target.value })
                  }
                >
                  {data.plans
                    .filter((plan) => !plan.archived)
                    .map((plan) => (
                      <option key={plan.id}>{plan.name}</option>
                    ))}
                </select>
              </label>
            </>
          )}
          {tab === "Billing history" && (
            <DataTable
              columns={[
                { key: "invoice", label: "Invoice" },
                { key: "date", label: "Date" },
                { key: "amount", label: "Amount" },
                {
                  key: "status",
                  label: "Status",
                  render: (value) => <Badge>{value}</Badge>,
                },
              ]}
              rows={data.invoices.filter(
                (item) => item.organization === clinic.name,
              )}
            />
          )}
          {tab === "Clinic information" && (
            <>
              <Detail label="Address" value={clinic.address} />
              <Detail label="Contact email" value={clinic.email} />
              <Detail label="Contact phone" value={clinic.phone} />
            </>
          )}
          {tab === "Activity log" && (
            <div className="space-y-4">
              {[
                "Organization profile updated",
                `${clinic.plan} plan assigned`,
                "Organization registered",
              ].map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <div className="text-xs text-slate-600">
                    {item}
                    <div className="mt-1 text-[10px] text-slate-400">
                      {index + 1} day{index ? "s" : ""} ago · Platform admin
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
        <Panel title="Account health" subtitle="Current organization snapshot">
          <div className="mb-4 rounded-lg bg-blue-50 p-4">
            <div className="text-xs text-blue-600">Subscription value</div>
            <b className="mt-1 block text-2xl text-blue-900">
              {clinic.plan === "Starter"
                ? "₹49"
                : clinic.plan === "Professional"
                  ? "₹99"
                  : "₹249"}
              <small className="text-xs font-normal text-blue-600">
                {" "}
                / month
              </small>
            </b>
          </div>
          <Detail label="Subscription renewal" value={clinic.renewal} />
          <Detail label="Active patients" value={clinic.patients.length} />
          <button
            className="btn btn-secondary mt-3 w-full"
            onClick={() =>
              updateClinic(clinic.id, {
                status: clinic.status === "Suspended" ? "Active" : "Suspended",
              })
            }
          >
            {clinic.status === "Suspended"
              ? "Reactivate organization"
              : "Suspend organization"}
          </button>
        </Panel>
      </div>
    </div>
  );
}

export function PlansPage() {
  const { data, addPlan, updatePlan, notify } = useStore();
  const plans = data.plans.filter((plan) => !plan.archived);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const plan = {
      id: editing?.id || `plan-${Date.now()}`,
      name: form.get("name"),
      price: Number(form.get("price")),
      yearly: Number(form.get("yearly")),
      clinics: `${form.get("locations")} locations`,
      staff: `${form.get("staff")} staff`,
      patients: `${form.get("patients")} patients`,
      description: form.get("description"),
      features: form
        .get("features")
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean),
      popular: form.get("popular") === "on",
    };
    if (editing) updatePlan(editing.id, plan);
    else addPlan(plan);
    setOpen(false);
    setEditing(null);
    notify(editing ? "Plan updated successfully" : "Plan created successfully");
  }
  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Pricing configuration"
        title="Subscription plans"
        description="Shape flexible plans that support clinics at every stage of growth."
        action={
          <PrimaryButton
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            Create plan
          </PrimaryButton>
        }
      />
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Published plans"
          value={plans.length}
          icon={CreditCard}
          tone="blue"
        />
        <StatCard
          label="Active subscribers"
          value={data.clinics.length + 126}
          icon={Users}
          tone="green"
        />
        <StatCard
          label="Annual savings"
          value="17%"
          icon={Activity}
          tone="purple"
        />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            className={`card relative p-6 ${plan.popular ? "border-blue-300 ring-2 ring-blue-100" : ""}`}
            key={plan.id}
          >
            {plan.popular && (
              <span className="absolute right-5 top-5 rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-blue-700">
                Most popular
              </span>
            )}
            <h2 className="text-lg font-bold text-slate-800">{plan.name}</h2>
            <p className="mt-2 min-h-9 text-[11px] leading-relaxed text-slate-500">
              {plan.description}
            </p>
            <div className="mt-5 text-3xl font-bold text-slate-800">
              ₹{plan.price}
              <span className="text-xs font-normal text-slate-400">
                {" "}
                / month
              </span>
            </div>
            <div className="mt-1 text-[10px] text-slate-400">
              ₹{plan.yearly} billed annually
            </div>
            <div className="my-5 border-t border-slate-100 pt-4">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Plan limits
              </h3>
              <div className="space-y-2.5">
                {[plan.clinics, plan.staff, plan.patients].map((item) => (
                  <div className="flex gap-2 text-xs text-slate-600" key={item}>
                    <Check size={14} className="text-emerald-500" />
                    {item}
                  </div>
                ))}
                {plan.features.map((item) => (
                  <div className="flex gap-2 text-xs text-slate-600" key={item}>
                    <Check size={14} className="text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-[10px] text-slate-400">
                {
                  data.clinics.filter((clinic) => clinic.plan === plan.name)
                    .length
                }{" "}
                demo subscribers
              </span>
              <div className="flex gap-2">
                <button
                  className="btn btn-secondary !px-3 !py-2 !text-[11px]"
                  onClick={() => {
                    setEditing(plan);
                    setOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-ghost !px-2 !py-2 text-rose-500"
                  aria-label={`Archive ${plan.name}`}
                  onClick={() => {
                    if (
                      data.clinics.some((clinic) => clinic.plan === plan.name)
                    ) {
                      notify("Plans in use cannot be archived");
                    } else if (
                      window.confirm(`Archive the ${plan.name} plan?`)
                    ) {
                      updatePlan(plan.id, { archived: true });
                      notify("Plan archived");
                    }
                  }}
                >
                  Archive
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {open && (
        <Modal
          title={
            editing ? "Edit subscription plan" : "Create subscription plan"
          }
          onClose={() => {
            setOpen(false);
            setEditing(null);
          }}
        >
          <form className="space-y-4" onSubmit={submit}>
            <Field
              label="Plan name"
              name="name"
              defaultValue={editing?.name}
              placeholder="e.g. Growth"
              required
            />
            <Field
              label="Description"
              name="description"
              defaultValue={editing?.description}
              placeholder="Who is this plan for?"
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Monthly price (₹)"
                name="price"
                type="number"
                defaultValue={editing?.price}
                required
              />
              <Field
                label="Annual price (₹)"
                name="yearly"
                type="number"
                defaultValue={editing?.yearly}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Field
                label="Locations"
                name="locations"
                defaultValue={editing?.clinics?.split(" ")[0]}
                placeholder="1"
                required
              />
              <Field
                label="Staff limit"
                name="staff"
                defaultValue={editing?.staff?.split(" ")[0]}
                placeholder="5"
                required
              />
              <Field
                label="Patient limit"
                name="patients"
                defaultValue={editing?.patients?.split(" ")[0]}
                placeholder="1000"
                required
              />
            </div>
            <Field
              label="Features (separated by commas)"
              name="features"
              defaultValue={editing?.features.join(", ")}
              placeholder="Advanced reports, Priority support"
            />
            <label className="flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                name="popular"
                defaultChecked={editing?.popular}
                className="accent-blue-600"
              />
              Mark as most popular
            </label>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <PrimaryButton type="submit" icon={null}>
                {editing ? "Save changes" : "Create plan"}
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export function SubscriptionsPage() {
  const { data, updateClinic, notify } = useStore();
  const [selected, setSelected] = useState(null);
  const rows = data.clinics.map((clinic) => ({
    ...clinic,
    organization: clinic.name,
    cycle: "Monthly",
    start: clinic.joined,
    renewal: clinic.renewal,
    amount:
      clinic.plan === "Starter"
        ? "₹49.00"
        : clinic.plan === "Professional"
          ? "₹99.00"
          : "₹249.00",
    status: <Badge>{clinic.status}</Badge>,
    action: (
      <button
        className="text-[11px] font-semibold text-blue-600"
        onClick={() => setSelected(clinic)}
      >
        Manage
      </button>
    ),
  }));
  function save(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    updateClinic(selected.id, {
      plan: form.get("plan"),
      status: form.get("status"),
      renewal: form.get("renewal"),
    });
    setSelected(null);
    notify("Subscription details updated");
  }
  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Recurring revenue"
        title="Subscriptions"
        description="Manage plans, renewals, and the subscription health of each organization."
      />
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Active subscriptions"
          value="118"
          change="+6.2%"
          icon={ShieldCheck}
          tone="green"
        />
        <StatCard
          label="Trials in progress"
          value="13"
          icon={Activity}
          tone="blue"
        />
        <StatCard
          label="Monthly recurring revenue"
          value="₹24,680"
          icon={Wallet}
          tone="purple"
        />
      </div>
      <Panel
        title="All subscriptions"
        subtitle="Assign plans and keep renewals on track"
      >
        <DataTable
          columns={[
            { key: "organization", label: "Organization" },
            { key: "plan", label: "Plan" },
            { key: "cycle", label: "Billing cycle" },
            { key: "start", label: "Started" },
            { key: "renewal", label: "Next renewal" },
            { key: "amount", label: "Amount" },
            { key: "status", label: "Status" },
            { key: "action", label: "" },
          ]}
          rows={rows}
        />
      </Panel>
      {selected && (
        <Modal
          title={`Manage ${selected.name}`}
          onClose={() => setSelected(null)}
        >
          <form className="space-y-4" onSubmit={save}>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-medium text-slate-600">
                Subscription plan
              </span>
              <select
                className="form-input !text-xs"
                name="plan"
                defaultValue={selected.plan}
              >
                {data.plans
                  .filter((plan) => !plan.archived)
                  .map((plan) => (
                    <option key={plan.id}>{plan.name}</option>
                  ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-medium text-slate-600">
                Status
              </span>
              <select
                className="form-input !text-xs"
                name="status"
                defaultValue={selected.status}
              >
                {[
                  "Trial",
                  "Active",
                  "Past Due",
                  "Cancelled",
                  "Expired",
                  "Suspended",
                ].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
            <Field
              label="Renewal date"
              name="renewal"
              type="date"
              defaultValue={selected.renewal}
            />
            <div className="rounded-lg bg-slate-50 p-3 text-[11px] text-slate-500">
              Changing a plan updates this clinic's demo workspace immediately.
              This does not process a payment.
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSelected(null)}
              >
                Cancel
              </button>
              <PrimaryButton type="submit" icon={null}>
                Save subscription
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export function SuperToolsPage({ page }) {
  const { data, notify } = useStore();
  if (page === "billing")
    return (
      <div className="content-wrap">
        <PageHeading
          eyebrow="Platform finances"
          title="Billing & invoices"
          description="Review platform revenue and the latest organization invoices."
          action={
            <button
              className="btn btn-secondary"
              onClick={() => window.print()}
            >
              <Download size={14} /> Export
            </button>
          }
        />
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total revenue"
            value="₹286,420"
            change="+8.4%"
            icon={Wallet}
            tone="green"
          />
          <StatCard
            label="Paid invoices"
            value="1,284"
            icon={Check}
            tone="blue"
          />
          <StatCard
            label="Outstanding invoices"
            value="₹4,240"
            icon={FileText}
            tone="orange"
          />
          <StatCard
            label="Failed payments"
            value="8"
            icon={Activity}
            tone="rose"
          />
        </div>
        <Panel
          title="Organization invoices"
          subtitle="A record of SaaS subscription billing"
        >
          <DataTable
            columns={[
              { key: "id", label: "Invoice number" },
              { key: "organization", label: "Organization" },
              { key: "date", label: "Billing date" },
              { key: "amount", label: "Amount" },
              {
                key: "status",
                label: "Status",
                render: (value) => <Badge>{value}</Badge>,
              },
              {
                key: "action",
                label: "Action",
                render: (_, row) => (
                  <button
                    className="text-[11px] font-semibold text-blue-600"
                    onClick={() => {
                      notify(`Mock invoice ${row.id} downloaded`);
                    }}
                  >
                    Download
                  </button>
                ),
              },
            ]}
            rows={data.invoices}
          />
        </Panel>
      </div>
    );
  if (page === "reports")
    return (
      <div className="content-wrap">
        <PageHeading
          eyebrow="Platform analytics"
          title="Reports"
          description="Understand platform growth, plan mix, and recurring revenue."
          action={
            <select
              className="form-input !w-auto !text-xs"
              aria-label="Report timeframe"
            >
              <option>Last 6 months</option>
              <option>This year</option>
            </select>
          }
        />
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Organization growth"
            value="+18.4%"
            change="+4.1%"
            icon={Building2}
            tone="blue"
          />
          <StatCard
            label="Net revenue retention"
            value="108.2%"
            icon={Activity}
            tone="green"
          />
          <StatCard
            label="Average revenue / org"
            value="₹208"
            icon={Wallet}
            tone="purple"
          />
        </div>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <Panel
            title="Organization growth"
            subtitle="New clinic registrations per month"
          >
            <MiniBar
              data={revenueData.map((item) => ({
                ...item,
                revenue: item.patients,
              }))}
            />
          </Panel>
          <Panel
            title="Monthly recurring revenue"
            subtitle="Revenue across all subscription plans"
          >
            <MiniBar data={revenueData} />
          </Panel>
        </div>
      </div>
    );
  if (page === "notifications")
    return (
      <div className="content-wrap">
        <PageHeading
          eyebrow="Platform updates"
          title="Notifications"
          description="Keep up with new organizations, renewals, and important account events."
          action={
            <button
              className="btn btn-secondary"
              onClick={() => notify("All notifications marked as read")}
            >
              Mark all as read
            </button>
          }
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Panel
            title="Recent activity"
            subtitle="Updates from across the platform"
          >
            <div className="space-y-4">
              {[
                {
                  title: "New clinic registered",
                  body: "GreenLife Clinic joined the platform on a free trial.",
                  time: "2 hours ago",
                  tone: "blue",
                },
                {
                  title: "Subscription renewed",
                  body: "CityCare Medical Center renewed its Professional plan.",
                  time: "Yesterday",
                  tone: "green",
                },
                {
                  title: "Payment needs attention",
                  body: "Harbor Health Studio has an outstanding invoice.",
                  time: "2 days ago",
                  tone: "rose",
                },
                {
                  title: "Trial ending soon",
                  body: "A clinic trial is due to end in 5 days.",
                  time: "3 days ago",
                  tone: "amber",
                },
              ].map((item) => (
                <div
                  className="flex gap-3 border-b border-slate-50 pb-4 last:border-0 last:pb-0"
                  key={item.title}
                >
                  <span
                    className={`mt-0.5 h-2.5 w-2.5 rounded-full ${item.tone === "green" ? "bg-emerald-500" : item.tone === "rose" ? "bg-rose-500" : item.tone === "amber" ? "bg-amber-500" : "bg-blue-500"}`}
                  />
                  <div className="flex-1">
                    <b className="block text-xs text-slate-700">{item.title}</b>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                      {item.body}
                    </p>
                    <span className="mt-1 block text-[10px] text-slate-400">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel
            title="Email preferences"
            subtitle="Choose which platform updates you receive"
          >
            <div className="space-y-4">
              {[
                "Organization registrations",
                "Subscription renewals",
                "Failed payments",
                "Weekly platform summary",
              ].map((label) => (
                <Toggle key={label} label={label} />
              ))}
            </div>
          </Panel>
        </div>
      </div>
    );
  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Platform preferences"
        title="Settings"
        description="Manage the ClinicFlow brand, defaults, and admin profile."
      />
      <div className="w-full space-y-6">
        <Panel
          title="Platform profile"
          subtitle="Set how ClinicFlow appears to your customers"
        >
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              notify("Platform settings saved");
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Platform name"
                name="platform"
                defaultValue="ClinicFlow"
              />
              <Field
                label="Support contact email"
                name="support"
                type="email"
                defaultValue="support@clinicflow.demo"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium text-slate-600">
                  Default currency
                </span>
                <select className="form-input !text-xs">
                  <option>INR · Indian Rupee (₹)</option>
                  <option>USD · US Dollar</option>
                  <option>EUR · Euro</option>
                  <option>GBP · Pound Sterling</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium text-slate-600">
                  Default billing cycle
                </span>
                <select className="form-input !text-xs">
                  <option>Monthly</option>
                  <option>Annual</option>
                </select>
              </label>

              <Field
                label="Default trial duration (days)"
                name="trial"
                type="number"
                defaultValue="14"
              />
            </div>

            <div className="space-y-3 rounded-xl bg-slate-50 p-4 border border-slate-100">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Automated Notification Alerts
              </span>
              <Toggle label="New organization registration" />
              <Toggle label="Subscription renewal reminders" />
              <Toggle label="Failed payment notifications" />
            </div>

            <div className="pt-2">
              <button className="btn btn-primary !py-2.5 !px-5 text-xs font-bold" type="submit">
                Save platform settings
              </button>
            </div>
          </form>
        </Panel>
      </div>
    </div>
  );
}

function MiniBar({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid stroke="#eef2f7" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar dataKey="revenue" fill="#668cf4" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
function Toggle({ label }) {
  const [on, setOn] = useState(true);
  return (
    <label className="flex items-center justify-between text-[11px] text-slate-600">
      {label}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={`h-5 w-9 rounded-full p-0.5 transition ${on ? "bg-blue-600" : "bg-slate-300"}`}
      >
        <span
          className={`block h-4 w-4 rounded-full bg-white transition ${on ? "translate-x-4" : ""}`}
        />
      </button>
    </label>
  );
}
function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  defaultValue,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium text-slate-600">
        {label}
      </span>
      <input
        className="form-input !text-xs"
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
      />
    </label>
  );
}
function Detail({ label, value }) {
  return (
    <div className="mb-3 flex justify-between gap-2 border-b border-slate-50 pb-2 text-xs">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-medium text-slate-700">{value}</span>
    </div>
  );
}

export function SuperEmailModulePage() {
  const {
    data,
    notify,
    toggleEmailTemplate,
    addEmailTemplate,
    updateEmailTemplate,
    deleteEmailTemplate,
    sendEmailNotification,
    resendEmailNotification,
    updateEmailNotificationStatus,
  } = useStore();

  const [activeTab, setActiveTab] = useState("templates"); // 'templates' | 'logs'
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Logs filters
  const [logStatusFilter, setLogStatusFilter] = useState("all");
  const [logRoleFilter, setLogRoleFilter] = useState("all");

  // Modals state
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    template: null,
    mode: "desktop",
  });
  const [editModal, setEditModal] = useState({
    isOpen: false,
    template: null,
    isNew: false,
  });
  const [viewLogModal, setViewLogModal] = useState({
    isOpen: false,
    log: null,
  });
  const [testEmailAddress, setTestEmailAddress] = useState(
    "admin@clinicos.health",
  );

  const templates = data.emailTemplates || [];
  const logs = data.emailNotifications || [];

  // Metrics
  const totalTemplates = templates.length;
  const enabledTemplates = templates.filter((t) => t.enabled).length;
  const totalSent = logs.filter((l) => l.status === "Sent").length;
  const pendingLogs = logs.filter(
    (l) => l.status === "Queued" || l.status === "Draft",
  ).length;

  // Filtered Templates
  const filteredTemplates = templates.filter((t) => {
    const matchesCategory =
      categoryFilter === "all" || t.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "enabled" && t.enabled) ||
      (statusFilter === "disabled" && !t.enabled);
    const matchesSearch =
      !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.key.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Filtered Logs
  const filteredLogs = logs.filter((l) => {
    const matchesStatus =
      logStatusFilter === "all" || l.status === logStatusFilter;
    const matchesRole = logRoleFilter === "all" || l.userRole === logRoleFilter;
    const matchesSearch =
      !searchQuery ||
      l.recipientEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.recipientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.templateKey?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesRole && matchesSearch;
  });

  // Sample data for rendering previews
  const getRenderedPreviewHtml = (template) => {
    if (!template) return "";
    const sampleData = {
      name: "Dr. Alex Morgan",
      email: "alex.morgan@clinicos.health",
      clinic_name: "Harbor Health Studio",
      clinic_address: "104 Market St, Suite 400",
      clinic_phone: "+1 (555) 234-5678",
      doctor_name: "Dr. Sarah Jenkins",
      patient_name: "Emma Wilson",
      plan_name: "Professional Care",
      billing_cycle: "Monthly",
      amount: "₹3,999.00",
      fee: "₹120.00",
      date: "Nov 02, 2026",
      time: "10:30 AM",
      consultation_type: "In-Person Consultation",
      reference_code: "CONF-839201",
      order_id: "ORD-MED-9281",
      pharmacy_name: "Apex Health Pharmacy",
      delivery_address: "742 Evergreen Terrace, Springfield",
      estimated_delivery: "30–45 mins",
      login_link: "/login",
      shift: "Morning (8:00 AM - 4:00 PM)",
      specialty: "Family Medicine",
      invoice_number: "INV-2026-089",
      reason: "Routine Annual Wellness Checkup",
      medications_count: "2",
      updated_fields: "Phone, Operating Hours",
      owner_name: "Dr. Maya Patel",
      next_renewal_date: "Nov 26, 2026",
      payment_method: "Credit Card (•• 4242)",
      transaction_id: "TXN-984210",
    };

    const interpSubject = interpolatePlaceholders(template.subject, sampleData);
    const interpHeadline = interpolatePlaceholders(
      template.headline,
      sampleData,
    );
    const interpBody = interpolatePlaceholders(
      template.body || template.bodyText || "",
      sampleData,
    );
    const interpPreheader = interpolatePlaceholders(
      template.preheader,
      sampleData,
    );
    const interpActionText = interpolatePlaceholders(
      template.actionText,
      sampleData,
    );
    const interpActionUrl = interpolatePlaceholders(
      template.actionUrl,
      sampleData,
    );

    const details = (template.detailsTemplate || []).map((row) => ({
      label: interpolatePlaceholders(row.label, sampleData),
      value: interpolatePlaceholders(row.value, sampleData),
    }));

    return buildHtmlEmail({
      title: interpHeadline || interpSubject,
      subject: interpSubject,
      headline: interpHeadline,
      preheader: interpPreheader,
      recipientName: sampleData.name,
      bodyText: interpBody,
      details,
      actionText: interpActionText,
      actionUrl: interpActionUrl,
      clinicName: sampleData.clinic_name,
    });
  };

  // Quick Test Dispatch
  const handleSendTestEmail = (template) => {
    if (!template) return;
    const result = sendEmailNotification({
      templateKey: template.key,
      recipientEmail: testEmailAddress || "admin@clinicos.health",
      recipientName: "Alex Morgan (Admin Test)",
      userRole: template.category,
      dynamicData: {
        name: "Alex Morgan",
        email: testEmailAddress || "admin@clinicos.health",
        clinic_name: "ClinicOS Test Clinic",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: "12:00 PM",
        reference_code: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
        doctor_name: "Dr. Sarah Jenkins",
        patient_name: "Emma Wilson",
        amount: "₹3,999.00",
        plan_name: "Professional Care",
        billing_cycle: "Monthly",
      },
    });
    if (result.success) {
      notify(
        `Test email for "${template.name}" delivered to ${testEmailAddress}!`,
      );
    }
  };

  const CATEGORIES = [
    { key: "all", label: "All Categories" },
    { key: "saas_admin", label: "SaaS Admin (10)" },
    { key: "clinic_admin", label: "Clinic Admin (10)" },
    { key: "doctor", label: "Doctor (7)" },
    { key: "receptionist", label: "Receptionist (6)" },
    { key: "patient", label: "Patient (12)" },
  ];

  const getRoleBadgeTone = (role) => {
    switch (role) {
      case "saas_admin":
        return "purple";
      case "clinic_admin":
        return "blue";
      case "doctor":
        return "green";
      case "receptionist":
        return "orange";
      case "patient":
        return "cyan";
      default:
        return "slate";
    }
  };

  const getStatusBadgeTone = (st) => {
    switch (st) {
      case "Sent":
        return "green";
      case "Queued":
        return "blue";
      case "Draft":
        return "slate";
      case "Failed":
        return "rose";
      default:
        return "slate";
    }
  };

  return (
    <div className="content-wrap pb-12">
      <PageHeading
        eyebrow="SaaS Administration"
        title="Email Notifications & Templates"
        description="Configure customizable email templates, preview responsive HTML mail, and monitor delivery history across all roles."
        action={
          <div className="flex items-center gap-2">
            <button
              className="btn btn-secondary !py-2 !text-xs"
              onClick={() => {
                setActiveTab("logs");
                notify("Viewing recent delivery history.");
              }}
            >
              <Clock size={14} /> View Delivery Logs ({logs.length})
            </button>
            <PrimaryButton
              onClick={() => {
                setEditModal({
                  isOpen: true,
                  isNew: true,
                  template: {
                    name: "",
                    key: "",
                    category: "saas_admin",
                    subject: "Update Regarding Your ClinicOS Account",
                    preheader:
                      "Important notification from ClinicOS Healthcare",
                    headline: "Important Account Update",
                    body: "Hello {name},\n\nWe would like to inform you about an important update to your ClinicOS account.\n\nPlease contact us if you have any questions.",
                    detailsTemplate: [
                      { label: "Organization", value: "{clinic_name}" },
                      { label: "Date", value: "{date}" },
                    ],
                    actionText: "Open Dashboard",
                    actionUrl: "/dashboard",
                    enabled: true,
                    placeholders: [
                      "{name}",
                      "{clinic_name}",
                      "{date}",
                      "{email}",
                    ],
                  },
                });
              }}
            >
              <Plus size={14} /> Create Template
            </PrimaryButton>
          </div>
        }
      />

      {/* Metrics Banner */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Email Templates"
          value={totalTemplates}
          icon={Mail}
          tone="blue"
          detail="45 pre-configured events"
        />
        <StatCard
          label="Active / Enabled Templates"
          value={enabledTemplates}
          icon={CheckCircle2}
          tone="green"
          detail={`${Math.round((enabledTemplates / (totalTemplates || 1)) * 100)}% active`}
        />
        <StatCard
          label="Delivered Notifications"
          value={totalSent}
          icon={Send}
          tone="purple"
          detail="Automated triggers active"
        />
        <StatCard
          label="Queued / In Flight"
          value={pendingLogs}
          icon={Clock}
          tone="orange"
          detail="Instant background dispatcher"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("templates")}
            className={`flex items-center gap-2 border-b-2 px-3 py-3 text-xs font-semibold transition ${
              activeTab === "templates"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Mail size={15} />
            Email Templates Catalog ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex items-center gap-2 border-b-2 px-3 py-3 text-xs font-semibold transition ${
              activeTab === "logs"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Clock size={15} />
            Notification Delivery Logs ({logs.length})
          </button>
        </div>

        {activeTab === "templates" && (
          <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" /> All
            templates support dynamic responsive HTML
          </div>
        )}
      </div>

      {/* TAB 1: TEMPLATES CATALOG */}
      {activeTab === "templates" && (
        <div className="space-y-5">
          {/* Controls Bar: Category filter pills + status filter + search */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategoryFilter(cat.key)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    categoryFilter === cat.key
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right side: Status filter & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                className="form-input !w-auto !py-1.5 !text-xs"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by template status"
              >
                <option value="all">All Statuses</option>
                <option value="enabled">Enabled Only</option>
                <option value="disabled">Disabled Only</option>
              </select>

              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search templates or subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input !w-64 !py-1.5 !pl-8 !text-xs"
                />
              </div>
            </div>
          </div>

          {/* Templates Grid / List */}
          <Panel
            title={`Templates (${filteredTemplates.length})`}
            subtitle="Click 'Preview' to view full desktop/mobile rendered HTML or 'Edit' to update text and dynamic tags"
          >
            {filteredTemplates.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Inbox size={36} className="mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-medium">
                  No email templates match the current filter criteria.
                </p>
                <button
                  className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
                  onClick={() => {
                    setCategoryFilter("all");
                    setStatusFilter("all");
                    setSearchQuery("");
                  }}
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex flex-col gap-4 py-4 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    {/* Left Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-slate-800 text-sm">
                          {template.name}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            template.category === "saas_admin"
                              ? "bg-purple-100 text-purple-700"
                              : template.category === "clinic_admin"
                                ? "bg-blue-100 text-blue-700"
                                : template.category === "doctor"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : template.category === "receptionist"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-cyan-100 text-cyan-700"
                          }`}
                        >
                          {template.category.replace("_", " ")}
                        </span>
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 font-mono">
                          {template.key}
                        </code>
                      </div>

                      <p className="mt-1 text-xs text-slate-600">
                        <span className="font-medium text-slate-400">
                          Subject:
                        </span>{" "}
                        {template.subject}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">
                          Tags:
                        </span>
                        {(template.placeholders || []).slice(0, 6).map((ph) => (
                          <span
                            key={ph}
                            className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 font-mono"
                          >
                            {ph}
                          </span>
                        ))}
                        {(template.placeholders || []).length > 6 && (
                          <span className="text-[10px] text-slate-400">
                            +{template.placeholders.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Action buttons */}
                    <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                      {/* Enable/Disable Toggle */}
                      <button
                        onClick={() => toggleEmailTemplate(template.id)}
                        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                          template.enabled
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                        title={
                          template.enabled
                            ? "Click to disable template"
                            : "Click to enable template"
                        }
                      >
                        {template.enabled ? (
                          <>
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Active
                          </>
                        ) : (
                          <>
                            <span className="h-2 w-2 rounded-full bg-slate-400" />
                            Disabled
                          </>
                        )}
                      </button>

                      {/* Preview Button */}
                      <button
                        onClick={() =>
                          setPreviewModal({
                            isOpen: true,
                            template,
                            mode: "desktop",
                          })
                        }
                        className="btn btn-secondary !py-1.5 !px-2.5 !text-xs"
                        title="Live responsive HTML preview"
                      >
                        <Eye size={13} />
                        Preview
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() =>
                          setEditModal({
                            isOpen: true,
                            isNew: false,
                            template: {
                              ...template,
                              body: template.body || template.bodyText || "",
                            },
                          })
                        }
                        className="btn btn-secondary !py-1.5 !px-2.5 !text-xs"
                        title="Edit subject, body, or dynamic tags"
                      >
                        <Edit2 size={13} />
                        Edit
                      </button>

                      {/* Test Dispatch Button */}
                      <button
                        onClick={() => handleSendTestEmail(template)}
                        className="btn btn-ghost !p-1.5 text-blue-600 hover:bg-blue-50"
                        title="Send sample test email"
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>
      )}

      {/* TAB 2: NOTIFICATION HISTORY & DELIVERY LOGS */}
      {activeTab === "logs" && (
        <div className="space-y-5">
          {/* Filter Bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <select
                className="form-input !w-auto !py-1.5 !text-xs"
                value={logStatusFilter}
                onChange={(e) => setLogStatusFilter(e.target.value)}
                aria-label="Filter delivery status"
              >
                <option value="all">All Delivery Statuses</option>
                <option value="Sent">Sent (Delivered)</option>
                <option value="Queued">Queued (In Flight)</option>
                <option value="Draft">Draft</option>
                <option value="Failed">Failed</option>
              </select>

              <select
                className="form-input !w-auto !py-1.5 !text-xs"
                value={logRoleFilter}
                onChange={(e) => setLogRoleFilter(e.target.value)}
                aria-label="Filter recipient role"
              >
                <option value="all">All Roles</option>
                <option value="saas_admin">SaaS Admin</option>
                <option value="clinic_admin">Clinic Admin</option>
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search recipient, subject, event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input !w-64 !py-1.5 !pl-8 !text-xs"
              />
            </div>
          </div>

          {/* Logs Table */}
          <Panel
            title={`Email Notification History (${filteredLogs.length})`}
            subtitle="Centralized audit trail of all triggered communications with rendered email bodies and resend support"
          >
            {filteredLogs.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Clock size={36} className="mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-medium">
                  No email notification logs found matching this filter.
                </p>
                <button
                  className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
                  onClick={() => {
                    setLogStatusFilter("all");
                    setLogRoleFilter("all");
                    setSearchQuery("");
                  }}
                >
                  Clear search filters
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <tr>
                      <th className="py-2.5 pr-4">Recipient</th>
                      <th className="py-2.5 px-4">Role</th>
                      <th className="py-2.5 px-4">Subject & Event</th>
                      <th className="py-2.5 px-4">Clinic Scope</th>
                      <th className="py-2.5 px-4">Timestamp</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 pl-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-slate-50/70 transition"
                      >
                        {/* Recipient */}
                        <td className="py-3 pr-4">
                          <b className="block text-slate-800 font-semibold">
                            {log.recipientName}
                          </b>
                          <span className="text-[11px] text-slate-400">
                            {log.recipientEmail}
                          </span>
                        </td>

                        {/* Role */}
                        <td className="py-3 px-4">
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                              log.userRole === "saas_admin"
                                ? "bg-purple-100 text-purple-700"
                                : log.userRole === "clinic_admin"
                                  ? "bg-blue-100 text-blue-700"
                                  : log.userRole === "doctor"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : log.userRole === "receptionist"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-cyan-100 text-cyan-700"
                            }`}
                          >
                            {log.userRole?.replace("_", " ")}
                          </span>
                        </td>

                        {/* Subject & Event */}
                        <td className="py-3 px-4 max-w-xs">
                          <div className="truncate font-medium text-slate-700">
                            {log.subject}
                          </div>
                          <code className="text-[10px] text-slate-400 font-mono">
                            {log.templateKey}
                          </code>
                        </td>

                        {/* Clinic */}
                        <td className="py-3 px-4 text-slate-600">
                          {log.clinicName || "Platform Global"}
                        </td>

                        {/* Timestamp */}
                        <td className="py-3 px-4 whitespace-nowrap text-slate-500">
                          {log.sentAt || log.createdAt}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              log.status === "Sent"
                                ? "bg-emerald-50 text-emerald-700"
                                : log.status === "Queued"
                                  ? "bg-blue-50 text-blue-700"
                                  : log.status === "Failed"
                                    ? "bg-rose-50 text-rose-700"
                                    : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                log.status === "Sent"
                                  ? "bg-emerald-500"
                                  : log.status === "Queued"
                                    ? "bg-blue-500"
                                    : log.status === "Failed"
                                      ? "bg-rose-500"
                                      : "bg-slate-400"
                              }`}
                            />
                            {log.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 pl-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() =>
                                setViewLogModal({ isOpen: true, log })
                              }
                              className="btn btn-secondary !py-1 !px-2 !text-[11px]"
                              title="View delivered HTML email content"
                            >
                              <Eye size={12} /> View
                            </button>
                            <button
                              onClick={() => resendEmailNotification(log.id)}
                              className="btn btn-ghost !p-1 text-blue-600 hover:bg-blue-50"
                              title="Resend this email"
                            >
                              <RotateCcw size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: LIVE RESPONSIVE HTML PREVIEW MODAL */}
      {/* ======================================================== */}
      {previewModal.isOpen && previewModal.template && (
        <Modal
          title={`Email Preview: ${previewModal.template.name}`}
          onClose={() =>
            setPreviewModal({ isOpen: false, template: null, mode: "desktop" })
          }
        >
          <div className="space-y-4">
            {/* Viewport & Device Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-100 p-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Device Viewport:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setPreviewModal((prev) => ({ ...prev, mode: "desktop" }))
                  }
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-semibold transition ${
                    previewModal.mode === "desktop"
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Monitor size={14} /> Desktop (600px)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPreviewModal((prev) => ({ ...prev, mode: "mobile" }))
                  }
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-semibold transition ${
                    previewModal.mode === "mobile"
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Smartphone size={14} /> Mobile (375px)
                </button>
              </div>

              <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">
                {previewModal.template.category.replace("_", " ")}
              </span>
            </div>

            {/* Email Headers Card */}
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs space-y-1.5 shadow-sm">
              <div className="flex gap-2">
                <span className="w-16 font-semibold text-slate-400">From:</span>
                <span className="text-slate-700">
                  ClinicOS Healthcare &lt;notifications@clinicos.health&gt;
                </span>
              </div>
              <div className="flex gap-2">
                <span className="w-16 font-semibold text-slate-400">To:</span>
                <span className="text-slate-700">
                  Dr. Alex Morgan &lt;alex.morgan@clinicos.health&gt;
                </span>
              </div>
              <div className="flex gap-2">
                <span className="w-16 font-semibold text-slate-400">
                  Subject:
                </span>
                <span className="font-semibold text-slate-900">
                  {interpolatePlaceholders(previewModal.template.subject, {
                    name: "Dr. Alex Morgan",
                    clinic_name: "Harbor Health Studio",
                    date: "Nov 02, 2026",
                    time: "10:30 AM",
                    amount: "₹3,999.00",
                    fee: "₹120.00",
                  })}
                </span>
              </div>
              {previewModal.template.preheader && (
                <div className="flex gap-2">
                  <span className="w-16 font-semibold text-slate-400">
                    Preheader:
                  </span>
                  <span className="text-slate-500 italic">
                    {previewModal.template.preheader}
                  </span>
                </div>
              )}
            </div>

            {/* Rendered HTML Container */}
            <div className="flex justify-center rounded-xl bg-slate-200/80 p-4 overflow-x-auto">
              <div
                className={`transition-all duration-300 rounded-lg shadow-md overflow-hidden bg-white ${
                  previewModal.mode === "desktop" ? "w-[600px]" : "w-[375px]"
                }`}
                style={{ height: "480px" }}
              >
                <iframe
                  title="HTML Email Preview"
                  srcDoc={getRenderedPreviewHtml(previewModal.template)}
                  className="w-full h-full border-0"
                />
              </div>
            </div>

            {/* Send Test Email Footer Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="Recipient test email..."
                  value={testEmailAddress}
                  onChange={(e) => setTestEmailAddress(e.target.value)}
                  className="form-input !text-xs !py-1.5 w-full sm:w-64"
                />
                <button
                  type="button"
                  onClick={() => handleSendTestEmail(previewModal.template)}
                  className="btn btn-secondary !py-1.5 !px-3 !text-xs whitespace-nowrap"
                >
                  <Send size={13} /> Send Test Email
                </button>
              </div>

              <button
                type="button"
                className="btn btn-secondary !py-1.5 !text-xs"
                onClick={() =>
                  setPreviewModal({
                    isOpen: false,
                    template: null,
                    mode: "desktop",
                  })
                }
              >
                Close Preview
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: CREATE / EDIT EMAIL TEMPLATE */}
      {/* ======================================================== */}
      {editModal.isOpen && editModal.template && (
        <Modal
          title={
            editModal.isNew
              ? "Create New Email Template"
              : `Edit Template: ${editModal.template.name}`
          }
          onClose={() =>
            setEditModal({ isOpen: false, template: null, isNew: false })
          }
        >
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const t = editModal.template;
              if (!t.name || !t.subject || !t.body) {
                notify("Please fill in Template Name, Subject, and Body.");
                return;
              }
              if (editModal.isNew) {
                const newKey = t.key || `custom_${Date.now()}`;
                addEmailTemplate({
                  ...t,
                  key: newKey,
                });
              } else {
                updateEmailTemplate(t.id, t);
              }
              setEditModal({ isOpen: false, template: null, isNew: false });
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-slate-600">
                  Template Name
                </span>
                <input
                  type="text"
                  required
                  value={editModal.template.name || ""}
                  onChange={(e) =>
                    setEditModal((prev) => ({
                      ...prev,
                      template: { ...prev.template, name: e.target.value },
                    }))
                  }
                  placeholder="e.g. Patient Appointment Confirmation"
                  className="form-input !text-xs"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-slate-600">
                  Event Key Identifier
                </span>
                <input
                  type="text"
                  required
                  disabled={!editModal.isNew}
                  value={editModal.template.key || ""}
                  onChange={(e) =>
                    setEditModal((prev) => ({
                      ...prev,
                      template: { ...prev.template, key: e.target.value },
                    }))
                  }
                  placeholder="e.g. custom_appointment_alert"
                  className="form-input !text-xs disabled:bg-slate-100 disabled:text-slate-400"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-slate-600">
                  Recipient Role Category
                </span>
                <select
                  value={editModal.template.category || "saas_admin"}
                  onChange={(e) =>
                    setEditModal((prev) => ({
                      ...prev,
                      template: { ...prev.template, category: e.target.value },
                    }))
                  }
                  className="form-input !text-xs"
                >
                  <option value="saas_admin">SaaS Super Admin</option>
                  <option value="clinic_admin">Clinic Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="patient">Patient</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-slate-600">
                  Headline
                </span>
                <input
                  type="text"
                  value={editModal.template.headline || ""}
                  onChange={(e) =>
                    setEditModal((prev) => ({
                      ...prev,
                      template: { ...prev.template, headline: e.target.value },
                    }))
                  }
                  placeholder="Headline displayed above body"
                  className="form-input !text-xs"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-slate-600">
                Subject Line
              </span>
              <input
                type="text"
                required
                value={editModal.template.subject || ""}
                onChange={(e) =>
                  setEditModal((prev) => ({
                    ...prev,
                    template: { ...prev.template, subject: e.target.value },
                  }))
                }
                placeholder="e.g. Appointment Confirmed - {clinic_name}"
                className="form-input !text-xs"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-slate-600">
                Preheader (Preview Text)
              </span>
              <input
                type="text"
                value={editModal.template.preheader || ""}
                onChange={(e) =>
                  setEditModal((prev) => ({
                    ...prev,
                    template: { ...prev.template, preheader: e.target.value },
                  }))
                }
                placeholder="Snippet visible in email inbox preview"
                className="form-input !text-xs"
              />
            </label>

            {/* Dynamic Placeholder Helper Bar */}
            <div className="rounded-lg bg-blue-50/70 border border-blue-100 p-2.5">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-800 mb-1.5">
                <Sparkles size={12} className="text-blue-600" /> Click a dynamic
                placeholder to insert into body:
              </div>
              <div className="flex flex-wrap gap-1">
                {[
                  "{name}",
                  "{email}",
                  "{clinic_name}",
                  "{clinic_address}",
                  "{clinic_phone}",
                  "{doctor_name}",
                  "{patient_name}",
                  "{plan_name}",
                  "{billing_cycle}",
                  "{amount}",
                  "{date}",
                  "{time}",
                  "{consultation_type}",
                  "{reference_code}",
                  "{order_id}",
                  "{login_link}",
                ].map((ph) => (
                  <button
                    key={ph}
                    type="button"
                    onClick={() => {
                      const curBody = editModal.template.body || "";
                      setEditModal((prev) => ({
                        ...prev,
                        template: {
                          ...prev.template,
                          body: `${curBody} ${ph} `,
                        },
                      }));
                    }}
                    className="rounded bg-white px-2 py-0.5 text-[10px] font-mono text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 transition"
                  >
                    + {ph}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-slate-600">
                Email Body Text
              </span>
              <textarea
                required
                rows={6}
                value={editModal.template.body || ""}
                onChange={(e) =>
                  setEditModal((prev) => ({
                    ...prev,
                    template: { ...prev.template, body: e.target.value },
                  }))
                }
                className="form-input !text-xs leading-relaxed font-sans"
                placeholder="Compose your email text with dynamic placeholders..."
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-slate-600">
                  Call-to-Action Button Label
                </span>
                <input
                  type="text"
                  value={editModal.template.actionText || ""}
                  onChange={(e) =>
                    setEditModal((prev) => ({
                      ...prev,
                      template: {
                        ...prev.template,
                        actionText: e.target.value,
                      },
                    }))
                  }
                  placeholder="e.g. View Appointment Details"
                  className="form-input !text-xs"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-slate-600">
                  Call-to-Action Button URL
                </span>
                <input
                  type="text"
                  value={editModal.template.actionUrl || ""}
                  onChange={(e) =>
                    setEditModal((prev) => ({
                      ...prev,
                      template: { ...prev.template, actionUrl: e.target.value },
                    }))
                  }
                  placeholder="e.g. /patient/appointments"
                  className="form-input !text-xs"
                />
              </label>
            </div>

            <label className="flex items-center gap-2 pt-1 text-xs text-slate-700">
              <input
                type="checkbox"
                checked={editModal.template.enabled !== false}
                onChange={(e) =>
                  setEditModal((prev) => ({
                    ...prev,
                    template: { ...prev.template, enabled: e.target.checked },
                  }))
                }
                className="h-4 w-4 rounded accent-blue-600"
              />
              <span className="font-semibold">
                Enable this template for automated event triggering
              </span>
            </label>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                className="btn btn-secondary !text-xs"
                onClick={() =>
                  setEditModal({ isOpen: false, template: null, isNew: false })
                }
              >
                Cancel
              </button>
              <PrimaryButton type="submit">
                {editModal.isNew ? "Create Template" : "Save Changes"}
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: VIEW DELIVERED EMAIL LOG */}
      {/* ======================================================== */}
      {viewLogModal.isOpen && viewLogModal.log && (
        <Modal
          title={`Delivered Email Log: ${viewLogModal.log.id}`}
          onClose={() => setViewLogModal({ isOpen: false, log: null })}
        >
          <div className="space-y-4">
            {/* Meta card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-lg bg-slate-50 border border-slate-100 p-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Recipient
                </span>
                <b className="text-slate-800">
                  {viewLogModal.log.recipientName}
                </b>
                <div className="text-[10px] text-slate-500">
                  {viewLogModal.log.recipientEmail}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Target Role
                </span>
                <span className="font-semibold text-slate-700 capitalize">
                  {viewLogModal.log.userRole?.replace("_", " ")}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Status
                </span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {viewLogModal.log.status}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Sent Timestamp
                </span>
                <span className="text-slate-700">
                  {viewLogModal.log.sentAt || viewLogModal.log.createdAt}
                </span>
              </div>
            </div>

            {/* Subject */}
            <div className="rounded border border-slate-200 bg-white p-2.5 text-xs">
              <span className="font-semibold text-slate-400">Subject: </span>
              <span className="font-bold text-slate-900">
                {viewLogModal.log.subject}
              </span>
            </div>

            {/* Iframe View */}
            <div className="flex justify-center rounded-xl bg-slate-200/80 p-3">
              <div
                className="w-[600px] max-w-full rounded-lg shadow-md overflow-hidden bg-white"
                style={{ height: "460px" }}
              >
                <iframe
                  title="Delivered Email Body"
                  srcDoc={viewLogModal.log.htmlContent}
                  className="w-full h-full border-0"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  resendEmailNotification(viewLogModal.log.id);
                  setViewLogModal({ isOpen: false, log: null });
                }}
                className="btn btn-secondary !py-1.5 !text-xs text-blue-600"
              >
                <RotateCcw size={13} /> Resend Email to{" "}
                {viewLogModal.log.recipientEmail}
              </button>

              <button
                type="button"
                className="btn btn-secondary !py-1.5 !text-xs"
                onClick={() => setViewLogModal({ isOpen: false, log: null })}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
