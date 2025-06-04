import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Check, X, Download } from 'lucide-react';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from '@/hooks/use-toast';
import { Order } from '../../types';

export const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      } as Order));
      
      // Sort by creation date (newest first)
      ordersData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive"
      });
    }
  };

  const deleteCloudinaryImage = async (imageUrl: string) => {
    try {
      // Extract public_id from Cloudinary URL
      const urlParts = imageUrl.split('/');
      const publicIdWithExtension = urlParts[urlParts.length - 1];
      const publicId = publicIdWithExtension.split('.')[0];
      
      // Delete from Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/looklify/image/destroy`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            public_id: publicId,
            api_key: '616536536546451',
            timestamp: Math.round(new Date().getTime() / 1000),
          }),
        }
      );
      
      console.log('Cloudinary deletion response:', await response.json());
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: 'accepted' | 'declined') => {
    try {
      if (status === 'accepted') {
        await updateDoc(doc(db, 'orders', orderId), { status });
        toast({
          title: "Success",
          description: "Order accepted successfully"
        });
      } else if (status === 'declined') {
        // Delete the order and associated image
        const orderToDelete = orders.find(order => order.id === orderId);
        if (orderToDelete?.paymentScreenshot) {
          await deleteCloudinaryImage(orderToDelete.paymentScreenshot);
        }
        await deleteDoc(doc(db, 'orders', orderId));
        toast({
          title: "Success",
          description: "Order declined and deleted successfully"
        });
      }
      
      fetchOrders();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: number) => {
    return `${(price / 1000).toFixed(1)}DT`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500">Accepted</Badge>;
      case 'declined':
        return <Badge variant="destructive">Declined</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <Card className="shadow-xl border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
        <CardTitle className="text-2xl font-bold text-gray-800">Orders Management</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Review and manage customer orders
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100">
                <TableHead className="font-bold text-gray-700">Order ID</TableHead>
                <TableHead className="font-bold text-gray-700">Customer</TableHead>
                <TableHead className="font-bold text-gray-700">Total</TableHead>
                <TableHead className="font-bold text-gray-700">Status</TableHead>
                <TableHead className="font-bold text-gray-700">Date</TableHead>
                <TableHead className="font-bold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-mono text-sm font-semibold">
                    {order.id.slice(-8).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-semibold text-gray-800">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-lg text-purple-600">
                    {formatPrice(order.total)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 hover:from-purple-700 hover:to-indigo-700"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Review order information and payment proof
              </DialogDescription>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Customer Information</h3>
                      <div className="space-y-2">
                        <div><strong>Name:</strong> {selectedOrder.customerName}</div>
                        <div><strong>Phone:</strong> {selectedOrder.phone}</div>
                        <div><strong>Email:</strong> {selectedOrder.email || 'N/A'}</div>
                        <div><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</div>
                        <div><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Order Items</h3>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                            </div>
                            <div className="font-semibold">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between items-center pt-3 border-t font-bold text-lg">
                          <span>Total:</span>
                          <span>{formatPrice(selectedOrder.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Payment Proof</h3>
                      {selectedOrder.paymentScreenshot ? (
                        <div className="space-y-3">
                          <img
                            src={selectedOrder.paymentScreenshot}
                            alt="Payment Screenshot"
                            className="w-full max-w-sm rounded-lg border"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(selectedOrder.paymentScreenshot, '_blank')}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            View Full Size
                          </Button>
                        </div>
                      ) : (
                        <div className="text-gray-500 italic">No payment proof uploaded</div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedOrder.status === 'pending' && (
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => updateOrderStatus(selectedOrder.id, 'declined')}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Decline Order
                    </Button>
                    <Button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'accepted')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Accept Order
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
