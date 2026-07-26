import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, BarChart3, Clock, Target } from "lucide-react"
import Link from "next/link"
import Logo from "@/public/images/Logo.svg";
import headerImage from "@/public/images/header-image.png";
import progressImage from "@/public/images/progress-tracking.png";
import timelineImage from "@/public/images/timeline-view.png";
import statusImage from "@/public/images/status-tracking.png";
import Image from "next/image";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src={Logo} alt="employtrack" width={100} height={100} />
            </div>
            <nav className="flex items-center gap-4">
              <Button className="hover:cursor-pointer font-sans tracking-tighter text-[16px]" variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button className="hover:cursor-pointer font-serif text-[18px] rounded-[3px]" size="sm" asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center text-center gap-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-balance text-start font-serif text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl">
              Track your job search with
              <br />
              <span className="text-primary">confidence</span>
            </h1>
            <div className="flex flex-col gap-6">
              <p className="mt-6 max-w-2xl text-pretty font-sans text-lg text-start tracking-tight text-muted-foreground">
                Stay organized and in control of your job applications. Track every opportunity from application to offer
                with employtrack. A simple, powerful tracking system.
              </p>
            
              <Button size="lg" className="w-fit hover:cursor-pointer font-serif text-[18px] rounded-[3px]" asChild>
                <Link href="/auth/register">Try it out</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <Image src={headerImage} alt="header" width={500} height={500} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden rounded-[3px] border bg-card">
          
            <Image
              src={statusImage}
              alt="Status tracking preview"
              width={500}
              height={500}
              className="object-contain"
            />
          

            <div className="border-t px-6 py-6 bg-off-white">
              <h3 className="font-serif text-xl text-foreground">Status tracking</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Label applications by status; applied, interviewing, offer, accepted, or rejected
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[3px] border bg-card">
          
            <Image
              src={timelineImage}
              alt="Timeline tracking preview"
              width={500}
              height={500}
              className="object-contain"
            />
          

            <div className="border-t px-6 py-6 bg-off-white">
              <h3 className="font-serif text-xl text-foreground">Timeline view</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                See your entire job search journey at a glance with clear timelines
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[3px] border bg-card">
          
            <Image
              src={progressImage}
              alt="Progress tracking preview"
              width={500}
              height={500}
              className="object-contain"
            />
          

            <div className="border-t px-6 py-6">
              <h3 className="font-serif text-xl text-foreground">Progress tracking</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Understand your job search metrics and improve your approach.
              </p>
            </div>
          </div>
          
          
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="border border-black/15 rounded-[3px] bg-off-white">
          <div className="flex flex-col items-center gap-6 p-12 text-center">
            <h2 className="text-balance text-3xl font-serif font-bold text-card-foreground sm:text-4xl">
              Ready to organize your job search ?
            </h2>
            <p className="max-w-xl text-pretty text-muted-foreground font-sans tracking-tighter">
              Join thousands of job seekers who use employtrack to stay organized and land their dream job.
            </p>
            <Button size="lg" className="hover:cursor-pointer font-serif text-[18px] rounded-[3px]" asChild>
              <Link href="/auth/register">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <Image src={Logo} alt="employtrack" width={100} height={100} />
            <p className="text-sm text-muted-foreground font-sans tracking-tight">© 2026 employtrack. Track your path to success.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}