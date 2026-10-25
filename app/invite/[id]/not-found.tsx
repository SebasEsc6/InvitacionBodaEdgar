import React from "react";
import Link from "next/link";
import { Search, Heart, ArrowLeft } from "lucide-react";
import BotanicalDivider from "@/components/ui/BotanicalDivider";

export default function NotFoundInvite() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-paper-texture text-center">
      <div className="max-w-md w-full bg-marfil-50 border border-dorado-antiguo/30 rounded-3xl p-8 shadow-luxury">
        <div className="w-16 h-16 rounded-full bg-verde-bosque/10 text-dorado-antiguo flex items-center justify-center mx-auto mb-6">
          <Heart className="w-8 h-8" />
        </div>

        <span className="font-script text-3xl text-dorado-antiguo block mb-1">
          Nuestra Boda
        </span>

        <h1 className="font-serif text-3xl text-verde-bosque font-medium mb-3">
          Invitación No Encontrada
        </h1>

        <BotanicalDivider variant="leaf" />

        <p className="font-sans text-xs sm:text-sm text-madera-nogal leading-relaxed mb-6">
          No pudimos localizar la invitación con ese enlace. Por favor verifica que el enlace recibido por WhatsApp o correo esté completo.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-verde-bosque text-marfil text-xs font-sans uppercase tracking-widest hover:bg-verde-bosque-light transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-dorado-antiguo" />
            <span>Volver a la Página Principal</span>
          </Link>

          <Link
            href="/invite/demo-familia"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white/70 border border-yute-natural/40 text-verde-bosque text-xs font-sans uppercase tracking-wider hover:bg-white transition-all"
          >
            <span>Ver Invitación de Demostración</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
