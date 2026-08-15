import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Heart,
  LayoutDashboard,
  MapPin,
  Menu,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  category: string;
  featured?: boolean;
  logo: string;
  logoColor: string;
  description: string;
  tags: string[];
};

const jobs: Job[] = [
  { id: 1, title: 'Senior Product Designer', company: 'Loomly', location: 'Remote · Worldwide', type: 'Full-time', salary: '$120k – $150k', category: 'Design', featured: true, logo: 'L', logoColor: 'bg-amber-100 text-amber-700', description: 'Lead product design for a thoughtful collaboration platform used by teams around the world. You will shape complex workflows into simple, delightful experiences.', tags: ['Figma', 'Product strategy', 'Systems'] },
  { id: 2, title: 'Frontend Engineer', company: 'Northstar Labs', location: 'New York, NY', type: 'Full-time', salary: '$135k – $170k', category: 'Engineering', featured: true, logo: 'N', logoColor: 'bg-sky-100 text-sky-700', description: 'Build fast, accessible interfaces that help modern teams make better decisions. You will work closely with design and product from first sketch to shipped feature.', tags: ['React', 'TypeScript', 'CSS'] },
  { id: 3, title: 'Customer Success Manager', company: 'Hatch', location: 'Austin, TX · Hybrid', type: 'Full-time', salary: '$85k – $105k', category: 'Customer Success', featured: true, logo: 'H', logoColor: 'bg-rose-100 text-rose-700', description: 'Partner with growing customers to help them get more value from their tools. Bring empathy, clear communication, and a love of solving real problems.', tags: ['SaaS', 'Onboarding', 'B2B'] },
  { id: 4, title: 'Content Marketing Lead', company: 'Common Thread', location: 'Remote · US only', type: 'Full-time', salary: '$95k – $125k', category: 'Marketing', logo: 'C', logoColor: 'bg-emerald-100 text-emerald-700', description: 'Own the content engine for a brand making work more human. Tell stories that educate, inspire, and turn curious readers into loyal customers.', tags: ['Editorial', 'SEO', 'Brand'] },
  { id: 5, title: 'Operations Associate', company: 'Goodwork', location: 'Chicago, IL', type: 'Full-time', salary: '$65k – $78k', category: 'Operations', logo: 'G', logoColor: 'bg-violet-100 text-violet-700', description: 'Keep a high-growth company moving with excellent systems, thoughtful coordination, and a bias toward making things easier for everyone.', tags: ['Operations', 'Notion', 'Project management'] },
  { id: 6, title: 'Product Manager, Growth', company: 'Finch', location: 'Remote · Americas', type: 'Full-time', salary: '$125k – $155k', category: 'Product', logo: 'F', logoColor: 'bg-blue-100 text-blue-700', description: 'Find the moments that turn new users into lifelong customers, then build experiences that make those moments happen more often.', tags: ['Growth', 'Analytics', 'B2C'] },
];

const categories = ['All categories', 'Engineering', 'Design', 'Product', 'Marketing', 'Customer Success', 'Operations'];

function App() {
  const [page, setPage] = useState<'home' | 'jobs' | 'dashboard'>('home');
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('All categories');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApply, setShowApply] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);
  const [applied, setApplied] = useState<number[]>([2]);
  const [toast, setToast] = useState('');

  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const haystack = `${job.title} ${job.company} ${job.category} ${job.tags.join(' ')}`.toLowerCase();
    return haystack.includes(search.toLowerCase()) &&
      (location === '' || job.location.toLowerCase().includes(location.toLowerCase()) || job.location.toLowerCase().includes('remote')) &&
      (category === 'All categories' || job.category === category);
  }), [search, location, category]);

  const navigate = (nextPage: 'home' | 'jobs' | 'dashboard') => {
    setPage(nextPage);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openJob = (job: Job) => {
    setSelectedJob(job);
    setShowApply(false);
  };

  const toggleSave = (id: number) => {
    setSaved((current) => current.includes(id) ? current.filter((jobId) => jobId !== id) : [...current, id]);
    setToast(saved.includes(id) ? 'Removed from saved jobs' : 'Job saved to your profile');
    window.setTimeout(() => setToast(''), 2200);
  };

  const submitApplication = () => {
    if (!selectedJob) return;
    setApplied((current) => current.includes(selectedJob.id) ? current : [...current, selectedJob.id]);
    setShowApply(false);
    setToast('Application sent successfully');
    window.setTimeout(() => setToast(''), 2600);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <button onClick={() => navigate('home')} className="flex items-center gap-3 text-left" aria-label="Go home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#146fe8] text-white shadow-lg shadow-blue-200"><BriefcaseBusiness size={21} strokeWidth={2.5} /></span>
            <span><span className="block text-[17px] font-bold leading-none tracking-tight">Workly</span><span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">Find your next</span></span>
          </button>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
            <button onClick={() => navigate('home')} className={page === 'home' ? 'text-[#146fe8]' : 'transition hover:text-slate-900'}>Home</button>
            <button onClick={() => navigate('jobs')} className={page === 'jobs' ? 'text-[#146fe8]' : 'transition hover:text-slate-900'}>Browse jobs</button>
            <button className="flex items-center gap-1 transition hover:text-slate-900">For employers <ChevronDown size={14} /></button>
            <button className="transition hover:text-slate-900">Resources</button>
          </nav>
          <div className="hidden items-center gap-5 md:flex">
            <button onClick={() => setShowAuth(true)} className="text-sm font-semibold text-slate-600 transition hover:text-slate-900">Log in</button>
            <button onClick={() => navigate('dashboard')} className="rounded-lg bg-[#11c785] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-100 transition hover:-translate-y-0.5 hover:bg-[#0db676]">Post a job</button>
          </div>
          <button className="rounded-lg p-2 text-slate-700 md:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X /> : <Menu />}</button>
        </div>
        {mobileMenu && <div className="border-t border-slate-100 bg-white px-5 py-5 md:hidden"><div className="grid gap-4 text-sm font-semibold"><button onClick={() => navigate('home')} className="text-left">Home</button><button onClick={() => navigate('jobs')} className="text-left">Browse jobs</button><button onClick={() => setShowAuth(true)} className="text-left">Log in</button><button onClick={() => navigate('dashboard')} className="rounded-lg bg-[#11c785] px-4 py-3 text-left text-white">Post a job</button></div></div>}
      </header>

      {page === 'home' ? <Home onBrowse={() => navigate('jobs')} search={search} setSearch={setSearch} onSearch={() => navigate('jobs')} /> : page === 'jobs' ? <JobsPage jobs={filteredJobs} search={search} setSearch={setSearch} location={location} setLocation={setLocation} category={category} setCategory={setCategory} saved={saved} toggleSave={toggleSave} openJob={openJob} /> : <Dashboard applied={applied} saved={saved} navigate={navigate} openJob={openJob} />}

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10"><div className="flex items-center gap-2 font-semibold text-slate-800"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#146fe8] text-white"><BriefcaseBusiness size={14} /></span>Workly</div><div className="flex flex-wrap gap-x-6 gap-y-2"><button>About us</button><button>For employers</button><button>Privacy</button><button>Terms</button></div><span>© 2026 Workly</span></div></footer>

      {selectedJob && <JobModal job={selectedJob} applied={applied.includes(selectedJob.id)} showApply={showApply} setShowApply={setShowApply} close={() => setSelectedJob(null)} submit={submitApplication} />}
      {showAuth && <AuthModal close={() => setShowAuth(false)} />}
      {toast && <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl"><Check size={16} className="text-emerald-400" />{toast}</div>}
    </div>
  );
}

function Home({ onBrowse, search, setSearch, onSearch }: { onBrowse: () => void; search: string; setSearch: (value: string) => void; onSearch: () => void }) {
  return <main>
    <section className="relative overflow-hidden bg-[#146fe8] text-white"><div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border-[70px] border-white/5" /><div className="absolute -bottom-44 left-1/3 h-[450px] w-[700px] rotate-12 rounded-[45%] bg-blue-500/30" /><div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 md:grid-cols-[1.05fr_.95fr] md:pb-24 md:pt-24 lg:px-10"><div className="max-w-xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-50"><Sparkles size={14} /> A better way to work</div><h1 className="text-5xl font-bold leading-[1.03] tracking-[-0.04em] sm:text-6xl">Find work that<br /><span className="text-[#a8f0d1]">feels like you.</span></h1><p className="mt-6 max-w-md text-base leading-7 text-blue-100 sm:text-lg">Discover meaningful opportunities from companies building the future. Your next chapter starts here.</p><div className="mt-8 flex flex-wrap gap-3"><button onClick={onBrowse} className="rounded-lg bg-[#11c785] px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#0db676]">Explore open roles <ArrowRight size={16} className="ml-2 inline" /></button><button onClick={onBrowse} className="rounded-lg border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/15">Upload your resume</button></div><div className="mt-10 flex items-center gap-8 text-sm text-blue-100"><span><strong className="block text-2xl text-white">4,536+</strong>open positions</span><span><strong className="block text-2xl text-white">1,200+</strong>hiring teams</span></div></div><div className="relative mx-auto w-full max-w-[500px] md:translate-y-5"><div className="absolute -left-2 top-14 h-20 w-20 rounded-3xl bg-[#11c785] opacity-90" /><div className="absolute -right-2 bottom-14 h-16 w-16 rounded-2xl bg-[#f9c74f]" /><div className="relative rounded-[28px] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm"><div className="overflow-hidden rounded-[20px] bg-white p-5 shadow-xl"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div><span className="h-2 w-20 rounded bg-slate-100" /></div><div className="mt-6 grid grid-cols-[1fr_1.3fr] gap-5"><div><div className="h-3 w-28 rounded bg-slate-200" /><div className="mt-4 h-20 rounded-xl bg-blue-50" /><div className="mt-4 space-y-2"><div className="h-2 w-full rounded bg-slate-100" /><div className="h-2 w-4/5 rounded bg-slate-100" /><div className="h-2 w-3/5 rounded bg-slate-100" /></div></div><div><div className="h-32 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-200" /><div className="mt-4 h-3 w-32 rounded bg-slate-200" /><div className="mt-3 flex gap-2"><div className="h-7 w-16 rounded-lg bg-emerald-100" /><div className="h-7 w-20 rounded-lg bg-slate-100" /></div><div className="mt-5 h-9 w-full rounded-lg bg-[#11c785]" /></div></div></div></div></div></div></section>
    <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5 sm:px-8"><div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-xl shadow-slate-200/70"><div className="grid gap-2 md:grid-cols-[1.4fr_1fr_auto]"><label className="flex items-center gap-3 rounded-xl px-4 py-3 transition focus-within:bg-slate-50"><Search size={20} className="text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Job title, skills, or company" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" /></label><label className="flex items-center gap-3 rounded-xl border-t border-slate-100 px-4 py-3 md:border-l md:border-t-0"><MapPin size={19} className="text-slate-400" /><input placeholder="Location or remote" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" /></label><button onClick={onSearch} className="rounded-xl bg-[#146fe8] px-7 py-3 text-sm font-bold text-white transition hover:bg-blue-700">Search jobs</button></div></div></section>
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 lg:px-10"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#146fe8]">Curated for you</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Featured opportunities</h2></div><button onClick={onBrowse} className="text-sm font-bold text-[#146fe8]">View all jobs <ArrowRight size={16} className="ml-1 inline" /></button></div><div className="mt-8 grid gap-5 lg:grid-cols-3">{jobs.filter((job) => job.featured).map((job) => <JobCard key={job.id} job={job} openJob={() => {}} toggleSave={() => {}} saved={false} featured />)}</div></section>
    <section className="border-y border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-3 lg:px-10"><Feature icon={<ShieldCheck />} title="Work with confidence" text="Every company is reviewed so you can focus on finding a role that fits." /><Feature icon={<Users />} title="People-first hiring" text="Meet teams who care about how great work gets done, not just what's on paper." /><Feature icon={<LayoutDashboard />} title="One simple profile" text="Showcase your experience once and apply to roles in a few clicks." /></div></section>
  </main>;
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#146fe8]">{icon}</div><div><h3 className="font-bold text-slate-900">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{text}</p></div></div>; }

function JobsPage({ jobs: visibleJobs, search, setSearch, location, setLocation, category, setCategory, saved, toggleSave, openJob }: { jobs: Job[]; search: string; setSearch: (value: string) => void; location: string; setLocation: (value: string) => void; category: string; setCategory: (value: string) => void; saved: number[]; toggleSave: (id: number) => void; openJob: (job: Job) => void }) { return <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#146fe8]">Open roles</p><h1 className="mt-3 text-4xl font-bold tracking-tight">Find your next opportunity</h1><p className="mt-3 text-slate-500">Search through roles from ambitious teams hiring right now.</p></div><div className="mt-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:grid-cols-[1.4fr_1fr_1fr_auto]"><label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"><Search size={18} className="text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search jobs" className="w-full bg-transparent text-sm outline-none" /></label><label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"><MapPin size={18} className="text-slate-400" /><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location" className="w-full bg-transparent text-sm outline-none" /></label><select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none">{categories.map((item) => <option key={item}>{item}</option>)}</select><button onClick={() => { setSearch(''); setLocation(''); setCategory('All categories'); }} className="rounded-xl px-4 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50">Clear</button></div><div className="mt-10 flex items-center justify-between"><p className="text-sm text-slate-500"><strong className="text-slate-900">{visibleJobs.length}</strong> jobs found</p><button className="flex items-center gap-2 text-sm font-semibold text-slate-600">Sort: Most relevant <ChevronDown size={15} /></button></div><div className="mt-4 grid gap-4 lg:grid-cols-2">{visibleJobs.map((job) => <JobCard key={job.id} job={job} openJob={openJob} toggleSave={toggleSave} saved={saved.includes(job.id)} />)}</div>{visibleJobs.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center"><Search className="mx-auto text-slate-300" size={40} /><h3 className="mt-4 font-bold">No roles match your search</h3><p className="mt-2 text-sm text-slate-500">Try a different title, location, or category.</p></div>}</main>; }

function JobCard({ job, openJob, toggleSave, saved, featured = false }: { job: Job; openJob: (job: Job) => void; toggleSave: (id: number) => void; saved: boolean; featured?: boolean }) { return <article className={`group relative cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 ${featured ? 'shadow-sm' : ''}`} onClick={() => openJob(job)}><div className="flex items-start justify-between gap-4"><div className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${job.logoColor}`}>{job.logo}</div><button onClick={(event) => { event.stopPropagation(); toggleSave(job.id); }} className={`rounded-lg p-2 transition ${saved ? 'bg-rose-50 text-rose-500' : 'text-slate-300 hover:bg-slate-50 hover:text-rose-400'}`} aria-label="Save job"><Heart size={19} fill={saved ? 'currentColor' : 'none'} /></button></div><div className="mt-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{job.company}</p><h3 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-[#146fe8]">{job.title}</h3><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-500"><span><MapPin size={14} className="mr-1 inline" />{job.location}</span><span><Clock3 size={14} className="mr-1 inline" />{job.type}</span></div></div><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-sm font-bold text-slate-700">{job.salary}</span><span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#146fe8]">{job.category}</span></div></article>; }

function Dashboard({ applied, saved, navigate, openJob }: { applied: number[]; saved: number[]; navigate: (page: 'home' | 'jobs' | 'dashboard') => void; openJob: (job: Job) => void }) { const appliedJobs = jobs.filter((job) => applied.includes(job.id)); const savedJobs = jobs.filter((job) => saved.includes(job.id)); return <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#146fe8]">Your workspace</p><h1 className="mt-3 text-4xl font-bold tracking-tight">Good morning, Alex</h1><p className="mt-3 text-slate-500">Keep track of your search and make your next move.</p></div><button onClick={() => navigate('jobs')} className="rounded-lg bg-[#146fe8] px-4 py-3 text-sm font-bold text-white">Explore more jobs</button></div><div className="mt-8 grid gap-4 sm:grid-cols-3"><Stat label="Applications sent" value={String(applied.length)} icon={<Send />} /><Stat label="Saved jobs" value={String(saved.length)} icon={<Heart />} /><Stat label="Profile strength" value="76%" icon={<Sparkles />} /></div><div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]"><section><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Recent applications</h2><button className="text-sm font-bold text-[#146fe8]">View all</button></div><div className="mt-4 space-y-3">{appliedJobs.map((job) => <button key={job.id} onClick={() => openJob(job)} className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-200 hover:shadow-md"><div className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${job.logoColor}`}>{job.logo}</div><div className="min-w-0 flex-1"><h3 className="truncate font-bold">{job.title}</h3><p className="mt-1 text-sm text-slate-500">{job.company} · {job.location}</p></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">In review</span></button>)}</div></section><aside className="rounded-2xl bg-[#146fe8] p-6 text-white"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"><FileText size={20} /></div><h2 className="mt-5 text-xl font-bold">Complete your profile</h2><p className="mt-2 text-sm leading-6 text-blue-100">Profiles with a resume and a short bio get noticed 3x more often.</p><div className="mt-5 h-2 rounded-full bg-blue-400"><div className="h-2 w-3/4 rounded-full bg-[#a8f0d1]" /></div><div className="mt-2 flex justify-between text-xs text-blue-100"><span>Profile strength</span><span>76%</span></div><button className="mt-6 w-full rounded-lg bg-white py-3 text-sm font-bold text-[#146fe8]">Edit profile</button></aside></div>{savedJobs.length > 0 && <section className="mt-10"><h2 className="text-xl font-bold">Saved jobs</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{savedJobs.map((job) => <JobCard key={job.id} job={job} openJob={openJob} toggleSave={() => {}} saved />)}</div></section>}</main>; }

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#146fe8]">{icon}</span><span className="text-3xl font-bold">{value}</span></div><p className="mt-4 text-sm font-medium text-slate-500">{label}</p></div>; }

function JobModal({ job, applied, showApply, setShowApply, close, submit }: { job: Job; applied: boolean; showApply: boolean; setShowApply: (value: boolean) => void; close: () => void; submit: () => void }) { return <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={close}><div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between"><div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold ${job.logoColor}`}>{job.logo}</div><button onClick={close} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X /></button></div>{showApply ? <ApplicationForm job={job} close={() => setShowApply(false)} submit={submit} /> : <><p className="mt-7 text-xs font-bold uppercase tracking-wider text-slate-400">{job.company}</p><h2 className="mt-2 text-3xl font-bold tracking-tight">{job.title}</h2><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500"><span><MapPin size={15} className="mr-1 inline" />{job.location}</span><span><Clock3 size={15} className="mr-1 inline" />{job.type}</span><span className="font-semibold text-slate-700">{job.salary}</span></div><div className="my-7 border-t border-slate-100" /><h3 className="font-bold">About the role</h3><p className="mt-3 text-sm leading-7 text-slate-600">{job.description}</p><h3 className="mt-7 font-bold">What you'll bring</h3><div className="mt-3 flex flex-wrap gap-2">{job.tags.map((tag) => <span key={tag} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">{tag}</span>)}</div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><button disabled={applied} onClick={() => setShowApply(true)} className="flex-1 rounded-lg bg-[#146fe8] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-emerald-500">{applied ? <><Check size={16} className="mr-2 inline" />Application sent</> : 'Apply for this role'}</button><button onClick={close} className="rounded-lg border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-600">Close</button></div></>}</div></div>; }

function ApplicationForm({ job, close, submit }: { job: Job; close: () => void; submit: () => void }) { return <div><button onClick={close} className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#146fe8]">← Back to job</button><h2 className="mt-5 text-3xl font-bold">Apply to {job.company}</h2><p className="mt-2 text-sm text-slate-500">{job.title} · Your application takes less than 2 minutes.</p><div className="mt-7 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Full name<input defaultValue="Alex Morgan" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 font-normal outline-none focus:border-[#146fe8]" /></label><label className="text-sm font-semibold">Email address<input defaultValue="alex@example.com" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 font-normal outline-none focus:border-[#146fe8]" /></label></div><label className="mt-4 block text-sm font-semibold">Resume<div className="mt-2 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-500"><FileText size={19} className="text-[#146fe8]" />alex-morgan-resume.pdf<span className="ml-auto text-xs text-[#146fe8]">Replace</span></div></label><label className="mt-4 block text-sm font-semibold">Short note <span className="font-normal text-slate-400">(optional)</span><textarea placeholder="Tell the team why you're excited..." className="mt-2 h-28 w-full resize-none rounded-lg border border-slate-200 px-3 py-3 font-normal outline-none focus:border-[#146fe8]" /></label><button onClick={submit} className="mt-6 w-full rounded-lg bg-[#11c785] py-3.5 text-sm font-bold text-white transition hover:bg-[#0db676]">Send application</button><p className="mt-3 text-center text-xs text-slate-400">By applying, you agree to share your profile with {job.company}.</p></div>; }

function AuthModal({ close }: { close: () => void }) { const [mode, setMode] = useState<'login' | 'signup'>('login'); return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-5 backdrop-blur-sm" onClick={close}><div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl sm:p-9" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between"><div><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#146fe8]"><BriefcaseBusiness /></div><h2 className="mt-5 text-2xl font-bold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2><p className="mt-2 text-sm text-slate-500">{mode === 'login' ? 'Sign in to manage your job search.' : 'Join thousands finding work they love.'}</p></div><button onClick={close} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={19} /></button></div><div className="mt-7 space-y-4"><label className="block text-sm font-semibold">Email address<input type="email" placeholder="you@example.com" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 font-normal outline-none focus:border-[#146fe8]" /></label><label className="block text-sm font-semibold">Password<input type="password" placeholder="••••••••" className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 font-normal outline-none focus:border-[#146fe8]" /></label><button onClick={close} className="w-full rounded-lg bg-[#146fe8] py-3.5 text-sm font-bold text-white">{mode === 'login' ? 'Log in' : 'Create account'}</button></div><p className="mt-6 text-center text-sm text-slate-500">{mode === 'login' ? "Don't have an account?" : 'Already have an account?'} <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="font-bold text-[#146fe8]">{mode === 'login' ? 'Sign up' : 'Log in'}</button></p></div></div>; }

export default App;
