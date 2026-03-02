/**
 * QR Code Display Component
 * Shows booking QR codes with download and sharing options
 */
import React, { useState, useRef } from 'react';
import { Download, Share2, Copy, Check, QrCode, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';

interface Booking {
  id: string;
  booking_id: string;
  temple_name: string;
  zone: string;
  booking_date: string;
  time_slot: string;
  number_of_people: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  qr_code_url: string;
  pilgrim_name: string;
  created_at: string;
}

interface QRCodeDisplayProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ booking, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const copyBookingDetails = async () => {
    const details = `
🏛️ TEMPLE INSIGHT 360 - DARSHAN BOOKING

📋 Booking ID: ${booking.booking_id}
🏛️ Temple: ${booking.temple_name}
📍 Zone: ${booking.zone}
👤 Pilgrim: ${booking.pilgrim_name}
📅 Date: ${formatDate(booking.booking_date)}
🕐 Time: ${booking.time_slot}
👥 People: ${booking.number_of_people}
📊 Status: ${booking.status.toUpperCase()}

Present this QR code at the temple entrance for quick access.
    `.trim();

    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
      toast.success('Booking details copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy booking details');
    }
  };

  const downloadQRCode = async () => {
    if (!booking.qr_code_url) {
      toast.error('QR code not available');
      return;
    }

    setDownloading(true);
    try {
      // Create a canvas to combine QR code with booking details
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      // Set canvas size
      canvas.width = 400;
      canvas.height = 600;

      // Fill background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load and draw QR code
      const qrImage = new Image();
      qrImage.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        qrImage.onload = resolve;
        qrImage.onerror = reject;
        qrImage.src = booking.qr_code_url;
      });

      // Draw QR code centered
      const qrSize = 200;
      const qrX = (canvas.width - qrSize) / 2;
      const qrY = 50;
      ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

      // Add text details
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      
      const textY = qrY + qrSize + 40;
      const lineHeight = 25;
      let currentY = textY;

      // Title
      ctx.font = 'bold 20px Arial';
      ctx.fillText('TEMPLE INSIGHT 360', canvas.width / 2, currentY);
      currentY += lineHeight + 10;

      // Booking details
      ctx.font = '14px Arial';
      const details = [
        `Booking: ${booking.booking_id}`,
        `Temple: ${booking.temple_name}`,
        `Zone: ${booking.zone}`,
        `Date: ${formatDate(booking.booking_date)}`,
        `Time: ${booking.time_slot}`,
        `People: ${booking.number_of_people}`,
        `Status: ${booking.status.toUpperCase()}`,
      ];

      details.forEach(detail => {
        ctx.fillText(detail, canvas.width / 2, currentY);
        currentY += lineHeight;
      });

      // Download the canvas as image
      const link = document.createElement('a');
      link.download = `pilgrims-window-booking-${booking.booking_id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast.success('QR code downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download QR code');
    } finally {
      setDownloading(false);
    }
  };

  const shareBooking = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Temple Insight 360 - Darshan Booking',
          text: `My darshan booking for ${booking.temple_name} on ${formatDate(booking.booking_date)}`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing or share API not supported
        await copyBookingDetails();
      }
    } else {
      // Fallback to copying details
      await copyBookingDetails();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Darshan Booking QR Code
          </DialogTitle>
          <DialogDescription>
            Present this QR code at the temple entrance for quick access
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Booking Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status.toUpperCase()}
            </Badge>
          </div>

          {/* QR Code Display */}
          <Card>
            <CardContent className="p-6">
              <div ref={qrRef} className="flex flex-col items-center space-y-4">
                {booking.qr_code_url ? (
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                    <img
                      src={booking.qr_code_url}
                      alt={`QR Code for booking ${booking.booking_id}`}
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <QrCode className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">QR Code Loading...</p>
                    </div>
                  </div>
                )}
                
                <div className="text-center">
                  <p className="font-mono text-lg font-semibold">{booking.booking_id}</p>
                  <p className="text-sm text-muted-foreground">Booking ID</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{booking.temple_name}</p>
                  <p className="text-sm text-muted-foreground">{booking.zone}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{formatDate(booking.booking_date)}</p>
                  <p className="text-sm text-muted-foreground">Darshan Date</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{booking.time_slot}</p>
                  <p className="text-sm text-muted-foreground">Time Slot</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{booking.number_of_people} {booking.number_of_people === 1 ? 'Person' : 'People'}</p>
                  <p className="text-sm text-muted-foreground">Group Size</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyBookingDetails}
              disabled={copied}
              className="flex items-center gap-2"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? 'Copied!' : 'Copy'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={shareBooking}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={downloadQRCode}
              disabled={downloading}
              className="flex items-center gap-2"
            >
              {downloading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Save
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Keep this QR code safe. You'll need it for temple entry.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDisplay;