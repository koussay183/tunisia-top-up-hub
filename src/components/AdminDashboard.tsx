
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderManager } from './admin/OrderManager';
import { ProductManager } from './admin/ProductManager';
import { D17Manager } from './admin/D17Manager';
import { WhatsAppManager } from './admin/WhatsAppManager';
import { useAdminStats } from '../hooks/useAdminStats';
import { Package, ShoppingCart, Users, TrendingUp, Settings, MessageCircle, Calendar, Activity } from 'lucide-react';

export const AdminDashboard = () => {
  const { stats, loading } = useAdminStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your e-commerce platform</p>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl shadow-lg">
              <Activity className="w-5 h-5 inline mr-2" />
              Live
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Orders</CardTitle>
              <div className="bg-blue-500 p-2 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{loading ? '...' : stats.totalOrders}</div>
              <p className="text-xs text-blue-600 mt-1">All time orders</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Products</CardTitle>
              <div className="bg-green-500 p-2 rounded-lg">
                <Package className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{loading ? '...' : stats.totalProducts}</div>
              <p className="text-xs text-green-600 mt-1">Active products</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Pending Orders</CardTitle>
              <div className="bg-orange-500 p-2 rounded-lg">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{loading ? '...' : stats.pendingOrders}</div>
              <p className="text-xs text-orange-600 mt-1">Awaiting processing</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Total Revenue</CardTitle>
              <div className="bg-purple-500 p-2 rounded-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{loading ? '...' : `${(stats.totalRevenue / 1000).toFixed(1)}DT`}</div>
              <p className="text-xs text-purple-600 mt-1">From accepted orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                Today's Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-gray-900">{loading ? '...' : stats.ordersToday}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                <Package className="w-4 h-4 mr-2 text-green-500" />
                Game Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-gray-900">{loading ? '...' : stats.gameCards}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-purple-500" />
                Mobile Packages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-gray-900">{loading ? '...' : stats.mobilePackages}</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Card className="bg-white shadow-xl border-0">
          <Tabs defaultValue="orders" className="w-full">
            <div className="border-b border-gray-200 px-6 pt-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-gray-50 p-1 rounded-xl">
                <TabsTrigger value="orders" className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Orders
                </TabsTrigger>
                <TabsTrigger value="products" className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Products
                </TabsTrigger>
                <TabsTrigger value="d17" className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  D17 Numbers
                </TabsTrigger>
                <TabsTrigger value="whatsapp" className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  WhatsApp
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="orders" className="mt-0">
                <OrderManager />
              </TabsContent>
              
              <TabsContent value="products" className="mt-0">
                <ProductManager />
              </TabsContent>
              
              <TabsContent value="d17" className="mt-0">
                <D17Manager />
              </TabsContent>
              
              <TabsContent value="whatsapp" className="mt-0">
                <WhatsAppManager />
              </TabsContent>
              
              <TabsContent value="settings" className="mt-0">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      General Settings
                    </CardTitle>
                    <CardDescription>
                      Configure general application settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Settings panel coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};
