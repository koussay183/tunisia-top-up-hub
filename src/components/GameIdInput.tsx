
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GameIdInputProps {
  gameId: string;
  setGameId: (id: string) => void;
  category: string;
}

export const GameIdInput = ({ gameId, setGameId, category }: GameIdInputProps) => {
  const { t } = useTranslation();

  const getGameName = () => {
    switch (category) {
      case 'freefire':
        return 'Free Fire';
      case 'pubg':
        return 'PUBG Mobile';
      case 'codm':
        return 'Call of Duty Mobile';
      default:
        return 'Game';
    }
  };

  const getTranslatedTitle = () => {
    return t(`gameId.${category}.title`, getGameName() + ' Player ID');
  };

  const getTranslatedPlaceholder = () => {
    return t(`gameId.${category}.placeholder`, `Enter your ${getGameName()} Player ID`);
  };

  const getTranslatedDescription = () => {
    return t(`gameId.${category}.description`, 'Enter your in-game Player ID to receive your purchase');
  };

  return (
    <Card className="border-2 border-dashed border-purple-200 bg-purple-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Gamepad2 className="w-5 h-5 text-purple-600" />
          {getTranslatedTitle()}
        </CardTitle>
        <CardDescription>
          {getTranslatedDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="gameId" className="text-sm font-medium">
            Player ID *
          </Label>
          <Input
            id="gameId"
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder={getTranslatedPlaceholder()}
            className="w-full"
            required
          />
          <p className="text-xs text-muted-foreground">
            Make sure your Player ID is correct to avoid delivery issues
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
