/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { 
  Elements, 
  PaymentElement, 
  useStripe, 
  useElements,
} from "@stripe/react-stripe-js"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  clientSecret: string
  onSuccess: () => void
  onCancel: () => void
}

function PaymentForm({ clientSecret, onSuccess, onCancel }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      })

      if (error) {
        toast.error(error.message || "Payment failed")
        return
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful!")
        onSuccess()
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Payment failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement 
        options={{
          layout: "tabs",
          paymentMethodOrder: ["card"],
          defaultValues: {
            billingDetails: {
              name: "",
              email: "",
              phone: "",
            }
          }
        }}
      />
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className="bg-rose-500 hover:bg-rose-600"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </div>
          ) : (
            "Pay now"
          )}
        </Button>
      </div>
    </form>
  )
}

export function StripePaymentForm(props: PaymentFormProps) {
  const options: StripeElementsOptions = {
    clientSecret: props.clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: '#e11d48',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        borderRadius: '0.5rem',
        spacingUnit: '4px',
      },
      rules: {
        '.Input': {
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        },
        '.Input:focus': {
          border: '1px solid #e11d48',
          boxShadow: '0 0 0 1px #e11d48',
        },
        '.Label': {
          color: '#4b5563',
          fontSize: '0.875rem',
          fontWeight: '500',
        },
        '.Tab': {
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        },
        '.Tab:hover': {
          color: '#e11d48',
        },
        '.Tab--selected': {
          border: '1px solid #e11d48',
          boxShadow: '0 0 0 1px #e11d48',
        },
      },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm {...props} />
    </Elements>
  )
}
