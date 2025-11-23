"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const handleRedirect = (route:string)=>{
    router.push(route)
  }
  return (
    <main className="min-h-screen dark:bg-zinc-900 w-full flex flex-col items-center justify-between bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full max-w-6xl px-6 py-24 text-center flex flex-col items-center gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Eleve o nível do seu comércio com o Operio controle total das suas
          operações.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl text-muted-foreground"
        >
          Controle vendas, retiradas, fluxo diário e relatórios com praticidade.
          Rápido, intuitivo e feito para qualquer tamanho de negócio.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            size="lg"
            onClick={() => handleRedirect("/login")}
            className="px-8 py-6 shadow-md hover:cursor-pointer hover:bg-transparent hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300 rounded-2xl"
          >
            Começar Agora
          </Button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="w-full max-w-6xl px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Registros do dia",
            desc: "Visualize rapidamente todas as entradas e saídas do dia em um só lugar.",
          },
          {
            title: "Gráficos de vendas",
            desc: "Acompanhe vendas totais, vendas em dinheiro e vendas no cartão/Pix de forma clara e visual.",
          },
          {
            title: "Gerenciamento de funcionários",
            desc: "Controle o acesso e visualize os registros feitos por cada colaborador.",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-2xl shadow-md dark:shadow-2xl h-full">
              <CardContent className="p-6 flex flex-col gap-3 h-full justify-between">
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-muted-foreground grow">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Daily Workflow Section */}
      <section className="w-full max-w-6xl px-6 py-16 flex flex-col items-center gap-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Fluxo Diário Simplificado
        </h2>
        <p className="text-center max-w-2xl text-muted-foreground">
          O administrador inicia o dia e gerencia suas operações diárias em
          poucos passos: registre vendas, controle retiradas e feche o dia com
          relatórios claros e organizados.
        </p>
        <div className="grid md:grid-cols-3 gap-6 w-full">
          {[
            {
              step: 1,
              title: "Iniciar dia",
              desc: "O administrador dá início ao dia para registrar todas as operações.",
            },
            {
              step: 2,
              title: "Registrar vendas e retiradas",
              desc: "Adicione rapidamente cada venda e registre retiradas em tempo real.",
            },
            {
              step: 3,
              title: "Fechar dia",
              desc: "Finalize o dia e gere relatórios detalhados para análise.",
            },
          ].map((item) => (
            <Card
              key={item.step}
              className="rounded-2xl shadow-md dark:shadow-2xl h-full"
            >
              <CardContent className="p-6 flex flex-col gap-3 h-full justify-between">
                <h4 className="text-lg font-semibold">
                  Passo {item.step}: {item.title}
                </h4>
                <p className="text-muted-foreground grow">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full max-w-6xl px-6 py-16 flex flex-col items-center gap-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Benefícios do Sistema
        </h2>
        <ul className="grid md:grid-cols-2 gap-4 max-w-4xl text-muted-foreground">
          {[
            "Economia de tempo no gerenciamento diário",
            "Redução de erros e retrabalho",
            "Visão clara das finanças do comércio",
            "Controle de acesso e responsabilidades dos funcionários",
            "Relatórios detalhados para tomada de decisões",
            "Interface intuitiva e rápida de usar",
          ].map((benefit, i) => (
            <li
              key={i}
              className="bg-muted/10 p-4 rounded-lg shadow-md dark:shadow-2xl"
            >
              • {benefit}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA final */}
      <section className="w-full max-w-6xl px-6 py-24 flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">Pronto para testar?</h2>
        <p className="text-lg max-w-xl text-muted-foreground">
          Comece gratuitamente e veja como o sistema pode facilitar sua rotina.
        </p>
        <Button
          size="lg"
          onClick={() => handleRedirect("/register")}
          className="px-8 py-6 shadow-md hover:cursor-pointer hover:bg-transparent hover:text-zinc-950 hover:dark:text-zinc-50 transition-all duration-300 rounded-2xl"
        >
          Criar minha conta
        </Button>
      </section>
    </main>
  );
}
