import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Save } from 'lucide-react';
import { useAdminSettings } from '../../hooks/useAdminSettings';
import { toast } from '@/hooks/use-toast';

export const D17Manager = () => {
  const { settings, loading, updateD17Numbers } = useAdminSettings();
  const [numbers, setNumbers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize numbers when settings are loaded
  useEffect(() => {
    if (settings && !loading) {
      setNumbers(settings.d17Numbers);
    }
  }, [settings, loading]);

  const addNumber = () => {
    setNumbers([...numbers, '']);
  };

  const removeNumber = (index: number) => {
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const validNumbers = numbers.filter(num => num.trim() !== '');
    
    if (validNumbers.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one D17 number",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    const success = await updateD17Numbers(validNumbers);
    
    if (success) {
      toast({
        title: "Success",
        description: "D17 numbers updated successfully"
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update D17 numbers",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading settings...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>D17 Payment Numbers</CardTitle>
        <CardDescription>
          Manage the D17 numbers that customers can send payments to
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {numbers.map((number, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex-1">
              <Label htmlFor={`number-${index}`} className="sr-only">
                D17 Number {index + 1}
              </Label>
              <Input
                id={`number-${index}`}
                value={number}
                onChange={(e) => updateNumber(index, e.target.value)}
                placeholder="Enter D17 number"
                className="font-mono"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeNumber(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={addNumber}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Number
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
