
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, Save } from 'lucide-react';
import { useAdminSettings } from '../../hooks/useAdminSettings';
import { toast } from '@/hooks/use-toast';

export const WhatsAppManager = () => {
  const { settings, updateWhatsAppNumber } = useAdminSettings();
  const [whatsappNumber, setWhatsappNumber] = useState(settings?.whatsappNumber || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!whatsappNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid WhatsApp number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const success = await updateWhatsAppNumber(whatsappNumber);
    
    if (success) {
      toast({
        title: "Success",
        description: "WhatsApp number updated successfully"
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update WhatsApp number",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-600" />
          WhatsApp Support
        </CardTitle>
        <CardDescription>
          Manage the WhatsApp support button number
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <Input
            id="whatsapp"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="+216123456789"
            className="font-mono"
          />
          <p className="text-sm text-muted-foreground">
            Include country code (e.g., +216 for Tunisia)
          </p>
        </div>
        
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save WhatsApp Number'}
        </Button>
      </CardContent>
    </Card>
  );
};
