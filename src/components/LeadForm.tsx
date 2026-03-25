import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  business: string;
  phone: string;
  services: string;
  pricing: string;
}

export default function LeadForm() {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    business: "",
    phone: "",
    services: "",
    pricing: "",
  });

  const phoneValid = /^\d{10}$/.test(form.phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.business || !form.phone) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (!phoneValid) {
      toast({ title: "Please enter a valid 10-digit phone number", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error: fnError } = await supabase.functions.invoke("send-lead-email", {
        body: form,
      });

      if (fnError) {
        console.error("Edge function error:", fnError);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="lead-form" className="py-24 bg-background relative overflow-hidden">
        <div className="container-site max-w-lg text-center">
          <div className="animate-fade-up">
            <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-6" />
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Thank You!</h2>
            <p className="text-muted-foreground text-lg mb-6">
              We've received your details and will get back to you shortly.
            </p>
            <p className="text-sm text-muted-foreground">
              💬 Want instant answers? Try our <strong>chatbot</strong> in the bottom-right corner!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="py-24 bg-background relative overflow-hidden">
      <div
        className="blob-shape w-72 h-72 top-10 -right-20"
        style={{ background: "hsl(24, 94%, 53%)" }}
      />
      <div
        className="blob-shape w-56 h-56 bottom-20 -left-16"
        style={{ background: "hsl(217, 72%, 42%)" }}
      />

      <div className="container-site max-w-xl relative z-10">
        <div
          ref={ref}
          className={`text-center mb-10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Get Started</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Tell Us About Your <span className="text-gradient">Business</span>
          </h2>
          <p className="text-muted-foreground mt-3">
            Fill in the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`bg-card rounded-lg p-8 shadow-xl border border-border space-y-5 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "200ms" }}
        >
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
            <Input
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Business Name *</label>
            <Input
              placeholder="Your business name"
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              className="rounded-lg"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number *</label>
            <Input
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
              className="rounded-lg"
              required
            />
            {form.phone.length > 0 && !phoneValid && (
              <p className="text-xs text-destructive mt-1">Please enter a valid 10-digit number</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Services Offered</label>
            <Textarea
              placeholder="What services does your business offer?"
              value={form.services}
              onChange={(e) => setForm({ ...form, services: e.target.value })}
              className="rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Pricing Details</label>
            <Textarea
              placeholder="Any specific pricing information you'd like on the website?"
              value={form.pricing}
              onChange={(e) => setForm({ ...form, pricing: e.target.value })}
              className="rounded-lg"
              rows={3}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 rounded-lg shadow-lg shadow-accent/20"
          >
            {loading ? "Submitting..." : (
              <>
                Submit Inquiry <Send className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            💬 Need quick answers? Chat with our assistant using the button below!
          </p>
        </form>
      </div>
    </section>
  );
}
