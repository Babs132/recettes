export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 mt-auto">
      <div className="mx-auto max-w-screen-xl px-4 text-center">
        <div className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-2">Babs Kitchen</div>
        <p className="text-slate-500 font-medium">Cuisiner simplement, manger bien.</p>
        <p className="text-slate-400 text-xs mt-4 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Babs Kitchen. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}