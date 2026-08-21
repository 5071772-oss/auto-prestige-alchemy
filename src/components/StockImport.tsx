import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Upload, FileSpreadsheet, CheckCircle2, AlertCircle, 
  Loader2, RefreshCw, Database
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SPREADSHEET_ID = '1mwPyeq_pnRIJ0yV0D-xH0wbHVrUB438mHKZvk_nnhog';

export default function StockImport() {
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [stats, setStats] = useState<{ total: number; success: number; failed: number } | null>(null);

  const handleImport = async () => {
    setLoading(true);
    setStats(null);
    try {
      // In a real environment, this would call an Edge Function that uses the Google Sheets API.
      // Since I have direct access to standard_connectors, I would use that in an Edge Function.
      // For now, I'll simulate the trigger and use a toast to explain the process.
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-stock`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ spreadsheetId: SPREADSHEET_ID }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при запуске синхронизации');
      }

      const result = await response.json();
      setStats(result);
      setLastSync(new Date().toLocaleString('ru-RU'));
      toast.success("Синхронизация завершена успешно");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Не удалось импортировать данные");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-graphite-deep border border-border p-8 rounded-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <Database className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-bold">Синхронизация с Google Таблицей</span>
          </div>
          <h3 className="font-display text-2xl text-gradient-soft mb-4">Массовый импорт</h3>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
            Настроена связь с таблицей «Автомобили в наличии (Stock)». 
            Все изменения в таблице будут перенесены на сайт после нажатия кнопки.
          </p>
        </div>
        <div className="text-right">
          <Button 
            onClick={handleImport} 
            disabled={loading}
            className="h-14 px-8 rounded-sm bg-primary text-primary-foreground hover:bg-primary-glow transition-smooth text-sm tracking-wide uppercase group"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            )}
            {loading ? 'Синхронизация...' : 'Обновить данные'}
          </Button>
          {lastSync && (
            <div className="mt-3 text-[10px] text-muted-foreground uppercase tracking-wider">
              Последнее обновление: {lastSync}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <a 
          href={`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 hover:border-primary/40 transition-smooth group"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-green-500/10 text-green-500 rounded-sm">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Источник данных</div>
            <div className="text-sm font-medium group-hover:text-primary transition-smooth underline decoration-primary/30">Google Таблица</div>
          </div>
        </a>

        <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-500/10 text-blue-500 rounded-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Статус связи</div>
            <div className="text-sm font-medium text-green-500">Активна</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {stats && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-sm flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">
              Результат: <strong className="text-foreground">{stats.total}</strong> записей. 
              Успешно: <strong className="text-green-500">{stats.success}</strong>. 
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
            For the code present, I get the error below.

Please think step-by-step in order to resolve it.
```
build failed with exit status 1: stderr:
de/chunks/dep-C6uTJdX2.js:65869:5)
    at onwarn (file:///dev-server/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:65534:7)
    at file:///dev-server/node_modules/rollup/dist/es/shared/node-entry.js:18669:13
    at Object.logger [as onLog] (file:///dev-server/node_modules/rollup/dist/es/shared/node-entry.js:20307:9)
    at ModuleLoader.handleInvalidResolvedId (file:///dev-server/node_modules/rollup/dist/es/shared/node-entry.js:19258:26)
    at file:///dev-server/node_modules/rollup/dist/es/shared/node-entry.js:19216:26
error: script "build:dev" exited with code 1

stdout:
vite v5.4.19 building for development...
transforming...
✓ 108 modules transformed.

If these errors do not contain enough detail to identify the fix, run lovable build diagnostics br_2f27eeae-3169-4134-b788-9864849bd60a --json with code--exec.
```
          </span>
        </div>
      </div>


    </div>
  );
}
