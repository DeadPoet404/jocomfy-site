import {
  render,
  screen,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import FinancePage from "@/app/portal/finance/page";

const mocks = vi.hoisted(() => ({
  apiFetch: vi.fn(),
}));

vi.mock("@/lib/api-client", () => ({
  apiFetch: mocks.apiFetch,
}));

vi.mock("@/lib/auth-context", () => ({
  useAuth: () => ({
    user: {
      email: "student@students.jocomfy.com",
      role: "STUDENT",
    },
  }),
}));

describe("FinancePage", () => {
  beforeEach(() => {
    mocks.apiFetch.mockReset();
  });

  it("renders safe empty states for a zero balance", async () => {
    mocks.apiFetch.mockResolvedValue({
      success: true,
      data: {
        balance: 0,
        invoices: [],
        payments: [],
        pendingIntent: null,
        student: {
          id: "student-1",
          studentId: "JCS0001",
          studentName: "Test Student",
        },
      },
    });

    render(<FinancePage />);

    expect(
      await screen.findByText(
        "No invoices on file.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "No payments recorded yet.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /No outstanding balance/,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(
        "parent@example.com",
      ),
    ).toHaveValue(
      "student@students.jocomfy.com",
    );

    expect(mocks.apiFetch).toHaveBeenCalledWith(
      "/payments/fees/me",
    );
  });

  it("formats balances, invoices, and payments as Ghana cedis", async () => {
    mocks.apiFetch.mockResolvedValue({
      success: true,
      data: {
        balance: 1250.5,
        invoices: [
          {
            amount: 2000,
            createdAt:
              "2026-08-01T00:00:00.000Z",
            description: "Term fees",
            dueDate:
              "2026-09-30T00:00:00.000Z",
            id: "invoice-1",
            invoiceNo: "INV-001",
            paidAmount: 749.5,
            status: "PARTIAL",
          },
        ],
        payments: [
          {
            allocationTarget: "Term fees",
            amountPaid: 749.5,
            dateProcessed:
              "2026-08-15T00:00:00.000Z",
            id: "payment-1",
            paymentMethod: "BANK",
            receiptNumber: "RCT-001",
            referenceNo: "REF-001",
          },
        ],
        pendingIntent: null,
        student: {
          id: "student-1",
          studentId: "JCS0001",
          studentName: "Test Student",
        },
      },
    });

    render(<FinancePage />);

    expect(
      await screen.findAllByText(
        "GHS 1,250.50",
      ),
    ).not.toHaveLength(0);

    expect(
      screen.getAllByText("GHS 2,000.00"),
    ).not.toHaveLength(0);

    expect(
      screen.getAllByText(/GHS 749.50/),
    ).not.toHaveLength(0);

    expect(
      screen.queryByText(
        "No invoices on file.",
      ),
    ).not.toBeInTheDocument();
  });
});
