
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Package, Gamepad2, Smartphone, Users, CreditCard, TrendingUp, Loader2 } from 'lucide-react';
import { ProductManager } from './admin/ProductManager';
import { OrderManager } from './admin/OrderManager';
import { D17Manager } from './admin/D17Manager';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAdminStats } from '../hooks/useAdminStats';

export const AdminDashboard = () => {
  const { logout } = useAdminAuth();
  const { stats, loading } = useAdminStats();
  const [activeTab, setActiveTab] = useState('products');

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <header className="bg-white shadow-xl border-b border-purple-100">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">TahaShop Admin</h1>
              <p className="text-lg text-gray-600 font-medium">Content Management System</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center space-x-2 border-2 border-purple-200 hover:bg-purple-50 rounded-2xl px-8 py-4 text-lg font-semibold"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-bold text-gray-700">Total Products</CardTitle>
              <Package className="h-7 w-7 text-indigo-600" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              ) : (
                <>
                  <div className="text-4xl font-bold text-indigo-600 mb-2">{stats.totalProducts}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                    Active products
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-bold text-gray-700">Game Cards</CardTitle>
              <Gamepad2 className="h-7 w-7 text-orange-600" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
              ) : (
                <>
                  <div className="text-4xl font-bold text-orange-600 mb-2">{stats.gameCards}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                    {stats.gamesCount} games available
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-bold text-gray-700">Mobile Packages</CardTitle>
              <Smartphone className="h-7 w-7 text-purple-600" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              ) : (
                <>
                  <div className="text-4xl font-bold text-purple-600 mb-2">{stats.mobilePackages}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                    {stats.providersCount} providers
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-bold text-gray-700">Orders Today</CardTitle>
              <Users className="h-7 w-7 text-green-600" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
              ) : (
                <>
                  <div className="text-4xl font-bold text-green-600 mb-2">{stats.ordersToday}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                    Today's orders
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-xl rounded-3xl p-3 border-0 h-16">
            <TabsTrigger 
              value="products" 
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white font-bold text-lg h-12"
            >
              Products Management
            </TabsTrigger>
            <TabsTrigger 
              value="orders"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white font-bold text-lg h-12"
            >
              Orders Management
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white font-bold text-lg h-12"
            >
              Payment Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductManager />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrderManager />
          </TabsContent>
          
          <TabsContent value="settings">
            <D17Manager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
