import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { ArrowUpRightIcon, Folder, FolderX } from 'lucide-react'
import Link from 'next/link'

const page = () => {
  return (
    <main className="dark:bg-zinc-900 w-dvw h-dvh flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderX />
          </EmptyMedia>
          <EmptyTitle>Não autorizado</EmptyTitle>
          <EmptyDescription>
            Você não tem permissão para acessar esta página.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button>
              <Link href={"/registry/record/create"}>Novo Registro</Link>
            </Button>
            <Button variant="outline">
              <Link href={"/registry/history"}>Ver Registros</Link>
            </Button>
          </div>
        </EmptyContent>
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        ></Button>
      </Empty>
    </main>
  );
}

export default page
