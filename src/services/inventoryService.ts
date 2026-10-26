import { InventoryItem } from '../types';
import { DEMO_INVENTORY } from '../demo-data';

export const inventoryService = {
  getInventory: async (clinicId?: string, branchId?: string): Promise<InventoryItem[]> => {
    let list = [...DEMO_INVENTORY];
    if (clinicId) {
      list = list.filter((i) => i.clinicId === clinicId);
    }
    if (branchId) {
      list = list.filter((i) => i.branchId === branchId);
    }
    return list;
  },

  updateStock: async (
    id: string,
    delta: number,
    _reason: 'Restock' | 'Adjustment' | 'Dispensed'
  ): Promise<InventoryItem | null> => {
    const item = DEMO_INVENTORY.find((i) => i.id === id);
    if (!item) return null;
    const newStock = Math.max(0, item.currentStock + delta);
    return {
      ...item,
      currentStock: newStock,
      lastUpdated: new Date().toISOString().slice(0, 10)
    };
  },

  addItem: async (item: Omit<InventoryItem, 'id' | 'lastUpdated'>): Promise<InventoryItem> => {
    return {
      ...item,
      id: `inv-${Date.now()}`,
      lastUpdated: new Date().toISOString().slice(0, 10)
    };
  }
};

