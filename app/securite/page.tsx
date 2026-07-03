import { Shield, Lock, Eye, Key } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SecuritePage() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-white">Sécurité & Accès</h1>
        <p className="text-sm text-slate-500 mt-0.5">Gestion des rôles, RLS et audit d'accès</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Shield, title: "Row Level Security", desc: "Toutes les tables Supabase ont RLS activé. Les données sont isolées par organisation.", status: "Actif", ok: true },
          { icon: Lock, title: "Authentification", desc: "Supabase Auth avec sessions sécurisées via @supabase/ssr. Tokens JWT vérifiés côté serveur.", status: "Actif", ok: true },
          { icon: Eye, title: "Audit Trail", desc: "Chaque action critique est enregistrée dans la table ActivityLog avec userId et timestamp.", status: "Actif", ok: true },
          { icon: Key, title: "Gestion des rôles", desc: "Rôles : Admin, Manager, Employé. Accès différenciés aux données et actions.", status: "À configurer", ok: false },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-base">
                <item.icon className="w-5 h-5 text-blue-400" />
                {item.title}
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border font-medium ${item.ok ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                  {item.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
