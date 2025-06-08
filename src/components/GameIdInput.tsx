
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Mail, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GameIdInputProps {
  gameId: string;
  setGameId: (id: string) => void;
  category: string;
  gameEmail?: string;
  setGameEmail?: (email: string) => void;
  gamePassword?: string;
  setGamePassword?: (password: string) => void;
}

export const GameIdInput = ({ 
  gameId, 
  setGameId, 
  category, 
  gameEmail = '', 
  setGameEmail, 
  gamePassword = '', 
  setGamePassword 
}: GameIdInputProps) => {
  const { t } = useTranslation();

  const getGameName = () => {
    switch (category) {
      case 'freefire':
        return 'Free Fire';
      case 'pubg':
        return 'PUBG Mobile';
      case 'codm':
        return 'Call of Duty Mobile';
      case 'mobilelegends':
        return 'Mobile Legends';
      case 'efootball':
        return 'eFootball';
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

  const isEFootball = category === 'efootball';

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
      <CardContent className="space-y-4">
        {isEFootball ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="gameEmail" className="text-sm font-medium">
                Konami Account Email *
              </Label>
              <Input
                id="gameEmail"
                type="email"
                value={gameEmail}
                onChange={(e) => setGameEmail?.(e.target.value)}
                placeholder="Enter your Konami account email"
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gamePassword" className="text-sm font-medium">
                Konami Account Password *
              </Label>
              <Input
                id="gamePassword"
                type="password"
                value={gamePassword}
                onChange={(e) => setGamePassword?.(e.target.value)}
                placeholder="Enter your Konami account password"
                className="w-full"
                required
              />
            </div>
          </>
        ) : (
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
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          {isEFootball 
            ? "Make sure your Konami account credentials are correct to avoid delivery issues"
            : "Make sure your Player ID is correct to avoid delivery issues"
          }
        </p>
      </CardContent>
    </Card>
  );
};
