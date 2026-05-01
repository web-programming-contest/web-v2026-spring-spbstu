CREATE OR REPLACE FUNCTION on_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
	IF NOT NEW.status = OLD.status THEN
		IF NEW.status = 'paid' THEN
			UPDATE orders SET paid_at = CURRENT_DATE WHERE id = NEW.id;
		ELSEIF NEW.status = 'cancelled' THEN
			UPDATE orders SET cancelled_at = CURRENT_DATE WHERE id = NEW.id;
		END IF;
	END IF;

	RETURN NEW;
	
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER order_status_change_tr
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION on_order_status_change();