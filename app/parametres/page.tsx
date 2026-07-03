import { Settings, Database, Bell, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ParametresPage() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-white">Paramètres</h1>
        <p className="text-sm text-slate-500 mt-0.5">Configuration de l'application</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Database, title: "Base de données", desc: "Connectez votre instance Supabase en configurant DATABASE_URL et DIRECT_URL dans .env.local" },
          { icon: Bell, title: "Notifications", desc: "Configurer les seuils d'alertes, les canaux (email, Slack) et les destinataires." },
          { icon: Globe, title: "Fuseaux horaires", desc: "Support multi-sites avec gestion des fuseaux horaires par établissement." },
          { icon: Settings, title: "Général", desc: "Nom de l'établissement, logo, langue, et préférences d'affichage." },
        ].map((item) => (
          <Card key={item.title} className="opacity-80 hover:opacity-100 transition-opacity">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-base">
                <item.icon className="w-5 h-5 text-slate-400" />
                {item.title}
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
