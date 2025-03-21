"use client"

import { CreditCard, BanknoteIcon as Bank, Trash2, Edit, CheckCircle2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const paymentMethodsData = [
  {
    id: "pm1",
    type: "bank",
    name: "Chase Bank",
    details: "Checking ••••1234",
    isDefault: true,
    addedOn: "2025-01-15",
  },
  {
    id: "pm2",
    type: "card",
    name: "Visa",
    details: "••••••••••••5678",
    isDefault: false,
    addedOn: "2025-02-10",
  },
  {
    id: "pm3",
    type: "bank",
    name: "Bank of America",
    details: "Savings ••••9012",
    isDefault: false,
    addedOn: "2025-03-05",
  },
]

export function PaymentMethods() {
  return (
    <div className="space-y-4">
      {paymentMethodsData.map((method) => (
        <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <div
              className={`rounded-full p-2 ${
                method.type === "bank" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}
            >
              {method.type === "bank" ? <Bank className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{method.name}</span>
                {method.isDefault && (
                  <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-500">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Default</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground">{method.details}</div>
              <div className="text-xs text-muted-foreground">
                Added on {new Date(method.addedOn).toLocaleDateString()}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!method.isDefault && (
                <DropdownMenuItem>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  <span>Set as Default</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Remove</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}

