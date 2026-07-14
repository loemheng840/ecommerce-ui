"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, absolutely. You can cancel your subscription at any time directly from your billing dashboard. There are no cancellation fees or hidden charges."
  },
  {
    question: "Do you offer a free trial?",
    answer: "We offer a 14-day free trial on all our plans. No credit card is required to sign up, so you can test out all the features risk-free."
  },
  {
    question: "What kind of support do you provide?",
    answer: "Starter plans receive email support with a 24-hour response time. Pro plans get priority email and chat support (1-hour response). Enterprise plans include a dedicated customer success manager and 24/7 phone support."
  },
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the prorated difference will be charged. If you downgrade, you'll receive a prorated credit toward your next billing cycle."
  }
];

export function FAQ() {
  return (
    <section className="py-24 bg-background" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Frequently asked questions
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border py-2">
                  <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
