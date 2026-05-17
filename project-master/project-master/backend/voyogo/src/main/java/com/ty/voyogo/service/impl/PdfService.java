package com.ty.voyogo.service.impl;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.ty.voyogo.entity.Booking;
import com.ty.voyogo.entity.Passenger;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    public byte[] generateTicketPdf(Booking booking)
            throws Exception {

        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        PdfWriter writer =
                new PdfWriter(out);

        PdfDocument pdf =
                new PdfDocument(writer);

        Document document =
                new Document(pdf);

        document.add(
                new Paragraph("Voyago Ticket")
                        .setBold()
                        .setFontSize(20)
        );

        document.add(
                new Paragraph(
                        "Booking ID: "
                                + booking.getBookingId()
                )
        );

        document.add(
                new Paragraph(
                        "Route: "
                                + booking.getTrip()
                                .getRoute()
                                .getSource()
                                + " → "
                                + booking.getTrip()
                                .getRoute()
                                .getDestination()
                )
        );

        document.add(
                new Paragraph(
                        "Date: "
                                + booking.getTrip()
                                .getTravelDate()
                )
        );

        document.add(
                new Paragraph("Passengers:")
        );

        for (Passenger p :
                booking.getPassengers()) {

            document.add(
                    new Paragraph(
                            p.getName()
                                    + " Seat: "
                                    + p.getBooking().getBookingSeats().stream().map(seat->seat.getSeat().getSeatNumber())
                    )
            );

        }

        document.add(
                new Paragraph(
                        "Total Paid: ₹"
                                + booking.getTotalAmount()
                )
        );

        document.close();

        return out.toByteArray();

    }

}

