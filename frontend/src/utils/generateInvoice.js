import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/BMC-logo.png";        // Your logo
import signature from "../assets/my-signature.png"; // Signature image

const generateInvoice = (booking) => {
  const doc = new jsPDF();

  // Add Logo (top-left)
  doc.addImage(logo, "PNG", 14, 10, 35, 20);

  // Invoice Heading (top-center)
  doc.setFontSize(22);
  doc.setTextColor(40, 40, 80);
  doc.text("Booking Invoice", 105, 22, null, null, "center");

  // Date and Booking ID
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 14, 38);
  doc.text(`Booking ID: ${booking.id}`, 14, 44);

  // Divider
  doc.setDrawColor(180);
  doc.line(14, 48, 196, 48);

  // Customer Details
  doc.setFontSize(13);
  doc.setTextColor(33, 33, 33);
  doc.text("Customer Details", 14, 56);

  autoTable(doc, {
    startY: 60,
    theme: "grid",
    styles: { fontSize: 11 },
    head: [["Name", "Phone", "Email"]],
    body: [[booking.customer, "9876543210", "zaid@example.com"]],
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  // Booking Details
  doc.setFontSize(13);
  doc.text("Booking Details", 14, doc.lastAutoTable.finalY + 10);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 14,
    theme: "grid",
    styles: { fontSize: 11 },
    head: [["Car Variant", "From", "To", "Total Days"]],
    body: [[
      booking.carVariant,
      booking.fromDate,
      booking.toDate,
      booking.totalDays,
    ]],
    headStyles: { fillColor: [39, 174, 96], textColor: 255 },
  });

  // Payment Summary
  doc.setFontSize(13);
  doc.text("Payment Summary", 14, doc.lastAutoTable.finalY + 10);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 14,
    theme: "striped",
    styles: { fontSize: 11 },
    body: [
      ["Booking Amount", `Rs. ${booking.price}`],
      ["Payment Status", booking.paymentStatus],
      ["Admin Approval", booking.approvalStatus],
      ["Booking Time", booking.bookingTime],
    ],
    columnStyles: {
      0: { fontStyle: 'bold', textColor: [44, 62, 80] },
      1: { textColor: [52, 73, 94] },
    },
  });

  // Highlight Total Price
  const totalY = doc.lastAutoTable.finalY + 10;
  doc.setFillColor(230, 230, 250);
  doc.rect(14, totalY, 182, 10, "F");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`Total Payable Amount: Rs. ${booking.price}`, 16, totalY + 7);

  // Signature and Footer
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Authorized Signature:", 14, 275);

  doc.addImage(signature, "PNG", 50, 263, 40, 20); // Signature below

  doc.setFontSize(10);
  doc.text("Thank you for choosing BookMyCar!", 14, 285);

  doc.save(`Invoice_${booking.id}.pdf`);
};

export default generateInvoice;
