package com.ty.voyogo.service.impl;

import com.ty.voyogo.entity.Booking;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    private final PdfService pdfService;


    public void sendTicketEmail(
            Booking booking
    ) throws Exception {

        MimeMessage message =
                mailSender.createMimeMessage();

        MimeMessageHelper helper =
                new MimeMessageHelper(
                        message,
                        true
                );

        helper.setTo(
                booking.getUser().getEmail()
        );

        helper.setSubject(
                "Voyago Ticket Confirmation"
        );

        helper.setText(
                "Your ticket is attached. "
                        + "Booking ID: "
                        + booking.getBookingId()
        );

        byte[] pdf =
                pdfService.generateTicketPdf(
                        booking
                );

        helper.addAttachment(
                "ticket.pdf",
                new ByteArrayResource(pdf)
        );

        mailSender.send(message);

    }

}

